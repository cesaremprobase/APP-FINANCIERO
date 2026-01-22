export type TransactionType = 'income' | 'expense';
export type AccountType = 'personal' | 'business';

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  balance: number;
  created_at?: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: TransactionType;
  icon?: string;
  is_business_related: boolean;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id?: string;
  amount: number;
  description?: string;
  date: string;
  related_sale_id?: string;
  related_expense_id?: string;
  
  // Joins opcionales
  account?: Account;
  category?: Category;
}

export interface CreateTransactionDTO {
  account_id: string;
  category_id?: string;
  amount: number;
  description?: string;
  date: string;
  type: TransactionType; // Helper para el frontend, aunque DB usa signo
}
