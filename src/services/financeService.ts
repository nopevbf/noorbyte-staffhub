import api from '@/lib/api';

export interface FinanceStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  date: string;
  amount: string;
  description: string;
  category: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export const getFinanceStats = async () => {
  const response = await api.get<FinanceStats>('/finance/dashboard');
  return response.data;
};

export const getTransactions = async () => {
    const response = await api.get<Transaction[]>('/finance/transactions');
    return response.data;
};
