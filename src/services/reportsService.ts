import api from '@/lib/api';

export interface AttendanceReportData {
  date: string;
  present: number;
  late: number;
  absent: number;
}

export interface AttendanceReportResponse {
  summary: string;
  data: AttendanceReportData[];
}

export const getAttendanceReport = async () => {
  const response = await api.get<AttendanceReportResponse>('/reports/attendance');
  return response.data;
};
