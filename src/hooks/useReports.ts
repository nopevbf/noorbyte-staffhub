import { useQuery } from '@tanstack/react-query';
import { getAttendanceReport } from '@/services/reportsService';

export const useAttendanceReport = () => {
  return useQuery({
    queryKey: ['reports', 'attendance'],
    queryFn: getAttendanceReport,
  });
};
