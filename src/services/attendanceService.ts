import api from '@/lib/api';

export interface AttendanceLog {
  id: string;
  employeeId: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'present' | 'late' | 'half_day' | 'absent';
  locationLat?: number;
  locationLng?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const getAttendanceHistory = async (employeeId: string) => {
  const response = await api.get<AttendanceLog[]>(`/attendance/history/${employeeId}`);
  return response.data;
};

export const clockIn = async (data: { employeeId: string; locationLat?: number; locationLng?: number }) => {
  const response = await api.post<AttendanceLog>('/attendance/clock-in', data);
  return response.data;
};

export const clockOut = async (data: { employeeId: string }) => {
  const response = await api.post<AttendanceLog>('/attendance/clock-out', data);
  return response.data;
};

export const getLeaves = async () => {
    const response = await api.get<LeaveRequest[]>('/attendance/leaves');
    return response.data;
};
