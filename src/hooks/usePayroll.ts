import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPayrollRuns, generatePayrollRun } from '@/services/payrollService';

export const usePayrollRuns = () => {
  return useQuery({
    queryKey: ['payroll', 'runs'],
    queryFn: getPayrollRuns,
  });
};

export const useGeneratePayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generatePayrollRun,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll', 'runs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
