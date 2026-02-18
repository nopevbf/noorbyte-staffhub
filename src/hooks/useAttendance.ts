import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAttendanceHistory, clockIn, clockOut, getLeaves } from '@/services/attendanceService';

export const useAttendanceHistory = (employeeId: string) => {
  return useQuery({
    queryKey: ['attendance', 'history', employeeId],
    queryFn: () => getAttendanceHistory(employeeId),
    enabled: !!employeeId,
  });
};

export const useClockIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clockIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useClockOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: clockOut,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] });
      },
    });
  };

export const useLeaves = () => {
    return useQuery({
        queryKey: ['attendance', 'leaves'],
        queryFn: getLeaves,
    });
};
