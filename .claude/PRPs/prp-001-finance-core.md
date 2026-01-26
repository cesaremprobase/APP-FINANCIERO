# PRP-001: Finanzas Personales Simplificadas (Modo Niña)

> **Estado**: EN PROGRESO
> **Fecha**: 2026-01-25
> **Proyecto**: SaaS Factory Finance

---

## Objetivo

Construir un sistema de finanzas personales enfocado en la **automatización extrema** y una **UX tan simple que una niña la pueda usar**. Se prioriza el ingreso rápido de datos, la visualización clara de "dinero disponible" y la automatización de presupuestos.

## Por Qué

| Problema | Solución |
|----------|----------|
| Las apps de finanzas son complejas y aburridas | UI Gamificada, botones grandes, colores vivos ("Modo Niña") |
| Olvido registrar gastos | Ingreso en < 3 clicks, accesos rápidos, soporte de voz |
| No sé cuánto puedo gastar hoy | Dashboard con indicador único: "Disponible Hoy/Semana" |

**Valor de negocio**: Aumenta la retención del usuario al reducir la fricción cognitiva. Convierte la gestión financiera en una tarea de 5 segundos.

## Qué

### Criterios de Éxito
- [ ] Ingresar una transacción toma menos de 5 segundos.
- [ ] Dashboard responde visualmente (rojo/verde) al estado del presupuesto.
- [ ] Todas las vistas funcionan perfecto en móvil (Mobile First).

### Comportamiento Esperado
1.  **Home**: Muestra TARJETAS grandes con saldo actual y botón FLOTANTE gigante para agregar gasto.
2.  **Add Transaction**: Formulario minimalista. Cantidad (teclado numérico grande) -> Categoría (iconos) -> Listo.
3.  **Budget**: Barras de progreso simples. "Has gastado el 50% de Comida".

---

## Contexto

### Referencias
- Skill: `frontend-design` (Big buttons, high contrast)
- Skill: `database-design` (Simple relational schema)

### Arquitectura Propuesta (Feature-First)
```
src/features/transactions/
├── components/ # TransactionForm, TransactionList
├── hooks/      # useTransactions
├── services/   # transactionService
└── store/      # transactionStore

src/features/dashboard/
├── components/ # BalanceCard, BudgetProgress
└── ...

src/features/categories/
├── components/ # CategoryPicker (Icon grid)
└── ...
```

### Modelo de Datos
```sql
-- Profiles: Extensión de auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  currency TEXT DEFAULT 'PEN', -- Soles
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Accounts: Efectivo, BCP, Interbank, etc.
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  balance DECIMAL(12,2) DEFAULT 0,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories: Comida, Transporte (Iconos emoji)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id), -- Null para globales
  name TEXT NOT NULL,
  icon TEXT NOT NULL, -- Emoji o nombre de icono
  color TEXT,
  type TEXT CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions: El corazón
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  account_id UUID REFERENCES accounts(id),
  category_id UUID REFERENCES categories(id),
  amount DECIMAL(12,2) NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense', 'transfer')),
  date DATE DEFAULT CURRENT_DATE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budgets: Metas mensuales
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  category_id UUID REFERENCES categories(id),
  amount DECIMAL(12,2) NOT NULL,
  month DATE NOT NULL, -- Primer día del mes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS habilitado en todas
```

---

## Blueprint (Assembly Line)

### Fase 1: Cimientos y Base de Datos
**Objetivo**: BD creada en Supabase y tipos de datos en la app.
**Validación**: Script SQL ejecutado sin errores, tablas visibles en Supabase Dashboard.

### Fase 2: UI Kit "Niña Mode"
**Objetivo**: Componentes visuales base con la estética deseada (Botones grandes, Cards, Tipografía clara).
**Validación**: Página `/design-system` mostrando los componentes.

### Fase 3: Gestión de Cuentas y Categorías
**Objetivo**: Crear/Editar cuentas (Bancos) y Categorías.
**Validación**: Usuario puede crear "Billetera" y categoría "Dulces".

### Fase 4: Transacciones Rápidas
**Objetivo**: El flujo principal de agregar gasto/ingreso.
**Validación**: Gasto registrado aparece en la cuenta y descuenta saldo.

### Fase 5: Dashboard y Presupuestos
**Objetivo**: Visualización de datos y feedback visual.
**Validación**: Gráficas simples muestran el estado financiero.

---

## Gotchas

- [ ] **Móvil primero**: Todo debe ser tocable con el dedo gordo (zonas táctiles de 44px+).
- [ ] **Teclado numérico**: En móvil, asegurar que abra el teclado numérico correcto.
- [ ] **Offline**: Considerar que pasa si no hay internet (React Query cache ayuda).

---

*PRP pendiente aprobación.*
