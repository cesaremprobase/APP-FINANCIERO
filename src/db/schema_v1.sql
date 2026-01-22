-- 🏭 SaaS Factory Schema V1: Hybrid Core (Finance + ERP Base)

-- 1. PROFILES (Usuarios)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  updated_at timestamp with time zone,
  
  -- Config
  business_name text default 'Mi Negocio',
  currency_symbol text default 'S/'
);

-- 2. ACCOUNTS (Donde vive el dinero: Billetera, Banco, Caja Negocio)
create table public.accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  name text not null, -- "BCP Ahorros", "Caja Chica Tienda"
  type text not null check (type in ('personal', 'business')), 
  balance numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. CATEGORIES (Para clasificar: Comida, Ventas, Pago Proveedor)
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  icon text, -- Emoji o nombre de icono
  is_business_related boolean default false
);

-- 4. TRANSACTIONS (El registro único de la verdad)
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  account_id uuid references public.accounts(id) not null,
  category_id uuid references public.categories(id),
  
  amount numeric not null, -- Negativo para gastos, positivo para ingresos
  description text,
  date timestamp with time zone default timezone('utc'::text, now()),
  
  -- Links al ERP (Futuro)
  related_sale_id uuid, -- Si viene de una venta
  related_expense_id uuid -- Si viene de una compra de insumos
);

-- 🔒 RLS (Seguridad Indestructible)
alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;

-- Políticas: "Solo veo mis propios datos"
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own data" on accounts for all using (auth.uid() = user_id);
create policy "Users can view own data" on categories for all using (auth.uid() = user_id);
create policy "Users can view own data" on transactions for all using (auth.uid() = user_id);

-- ⚡ Trigger para crear perfil automático al registrarse
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  -- Crear cuentas por defecto
  insert into public.accounts (user_id, name, type, balance)
  values 
    (new.id, 'Efectivo (Personal)', 'personal', 0),
    (new.id, 'Caja Negocio', 'business', 0);
    
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
