export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    avatar_url: string | null
                    currency: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    avatar_url?: string | null
                    currency?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    currency?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            accounts: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    balance: number | null
                    icon: string | null
                    color: string | null
                    is_archived: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    balance?: number | null
                    icon?: string | null
                    color?: string | null
                    is_archived?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    balance?: number | null
                    icon?: string | null
                    color?: string | null
                    is_archived?: boolean | null
                    created_at?: string
                }
            }
            categories: {
                Row: {
                    id: string
                    user_id: string | null
                    name: string
                    icon: string
                    color: string | null
                    type: 'income' | 'expense' | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    name: string
                    icon: string
                    color?: string | null
                    type?: 'income' | 'expense' | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    name?: string
                    icon?: string
                    color?: string | null
                    type?: 'income' | 'expense' | null
                    created_at?: string
                }
            }
            transactions: {
                Row: {
                    id: string
                    user_id: string
                    account_id: string | null
                    category_id: string | null
                    amount: number
                    type: 'income' | 'expense' | 'transfer' | null
                    date: string | null
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    account_id?: string | null
                    category_id?: string | null
                    amount: number
                    type?: 'income' | 'expense' | 'transfer' | null
                    date?: string | null
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    account_id?: string | null
                    category_id?: string | null
                    amount?: number
                    type?: 'income' | 'expense' | 'transfer' | null
                    date?: string | null
                    description?: string | null
                    created_at?: string
                }
            }
            budgets: {
                Row: {
                    id: string
                    user_id: string
                    category_id: string
                    amount: number
                    month: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    category_id: string
                    amount: number
                    month: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    category_id?: string
                    amount?: number
                    month?: string
                    created_at?: string
                }
            }
        }
    },
    Views: {
        [_ in never]: never
    },
    Functions: {
        [_ in never]: never
    },
    Enums: {
        [_ in never]: never
    },
    CompositeTypes: {
        [_ in never]: never
    }
}
