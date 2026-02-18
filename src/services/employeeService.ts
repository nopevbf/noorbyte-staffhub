import api from '@/lib/api';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeCode: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
}

export const getEmployees = async () => {
  const response = await api.get<Employee[]>('/employees');
  return response.data;
};

export const getEmployee = async (id: string) => {
  const response = await api.get<Employee>(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (data: Omit<Employee, 'id'>) => {
  const response = await api.post<Employee>('/employees', data);
  return response.data;
};
