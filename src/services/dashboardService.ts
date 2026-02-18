import api from '@/lib/api';

export interface DashboardStats {
  totalEmployees: number;
  attendanceRate: number;
  pendingLeaves: number;
  lastPayrollStatus: string;
  timestamp: string;
}

export const getDashboardStats = async () => {
  const response = await api.get<DashboardStats>('/dashboard/stats');
  return response.data;
};
