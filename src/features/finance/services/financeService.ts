import { supabase } from '@/shared/lib/supabase/client';
import { Account, Transaction, CreateTransactionDTO } from '../types';

export const financeService = {
    // 🏦 Obtener todas las cuentas del usuario
    getAccounts: async (): Promise<Account[]> => {
        const { data, error } = await supabase
            .from('accounts')
            .select('*')
            .order('type', { ascending: false }); // Business primero

        if (error) throw error;
        return data || [];
    },

    // 💸 Registrar una transacción (Ingreso o Gasto)
    createTransaction: async (dto: CreateTransactionDTO): Promise<Transaction> => {
        // 1. Calcular monto real (negativo si es gasto)
        const finalAmount = dto.type === 'expense' ? -Math.abs(dto.amount) : Math.abs(dto.amount);

        // 1.5 Obtener usuario actual
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuario no autenticado');

        // 2. Insertar movimiento
        const { data: transaction, error: txError } = await (supabase
            .from('transactions') as any)
            .insert({
                user_id: user.id,
                account_id: dto.account_id,
                category_id: dto.category_id,
                amount: finalAmount,
                description: dto.description,
                date: dto.date
            })
            .select()
            .single();

        if (txError) throw txError;

        // 3. Actualizar saldo de la cuenta (Manual fetch+update por ahora)
        // (En producción usaremos un Trigger de Postgres)

        // CORRECCIÓN: Haremos un fetch+update simple por ahora para no complicar con RPCs todavía
        // (En producción usaremos un Trigger de Postgres)
        const { data: account } = await (supabase
            .from('accounts') as any)
            .select('balance')
            .eq('id', dto.account_id)
            .single();

        if (account) {
            await (supabase
                .from('accounts') as any)
                .update({ balance: account.balance + finalAmount })
                .eq('id', dto.account_id);
        }

        return transaction;
    },

    // 📊 Obtener historial
    getTransactions: async (limit = 10): Promise<Transaction[]> => {
        const { data, error } = await supabase
            .from('transactions')
            .select('*, account:accounts(name), category:categories(name, icon)')
            .order('date', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data || [];
    }
};
