import { supabase } from '@/shared/lib/supabase/client';
import { Database } from '@/types/database.types';

type Account = Database['public']['Tables']['accounts']['Row'];
type AccountInsert = Database['public']['Tables']['accounts']['Insert'];

export const accountService = {
    /**
     * Get all accounts for the current user
     */
    async getAccounts() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_archived', false) // Don't show archived by default
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Raw Supabase Error:', JSON.stringify(error, null, 2));
            throw error;
        }
        return data as Account[];
    },

    /**
     * Create a new account
     */
    async createAccount(account: Omit<AccountInsert, 'user_id'>) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('accounts')
            .insert({
                ...account,
                user_id: user.id,
            })
            .select()
            .single();

        if (error) throw error;
        return data as Account;
    },

    /**
     * Get total balance across all accounts
     */
    async getTotalBalance() {
        const accounts = await this.getAccounts();
        return accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    }
};
