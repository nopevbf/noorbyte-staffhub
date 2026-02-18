import { useQuery } from '@tanstack/react-query';
import { getFinanceStats, getTransactions } from '@/services/financeService';

export const useFinanceStats = () => {
  return useQuery({
    queryKey: ['finance', 'stats'],
    queryFn: getFinanceStats,
  });
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['finance', 'transactions'],
    queryFn: getTransactions,
  });
};
