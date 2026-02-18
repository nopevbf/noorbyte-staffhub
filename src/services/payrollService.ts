import api from '@/lib/api';

export interface PayrollRun {
  id: string;
  period: string;
  totalEmployees: number;
  totalGross: number;
  totalNet: number;
  status: 'draft' | 'processing' | 'completed';
  processDate: string;
}

export const getPayrollRuns = async () => {
  const response = await api.get<PayrollRun[]>('/payroll/runs');
  return response.data;
};

export const generatePayrollRun = async (period: string) => {
  const response = await api.post<PayrollRun>('/payroll/run', { period });
  return response.data;
};

export const getPayslips = async (runId: string) => {
    const response = await api.get(`/payroll/payslips/${runId}`);
    return response.data;
};
