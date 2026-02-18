import api from '@/lib/api';

export interface BotLog {
  id: string;
  sessionId: string;
  direction: 'inbound' | 'outbound';
  content: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
}

export interface BotStatus {
  status: 'connected' | 'disconnected';
  batteryLevel: number;
  lastSync: string;
}

export const getBotLogs = async () => {
  const response = await api.get<BotLog[]>('/bot/logs');
  return response.data;
};

export const getBotStatus = async () => {
  const response = await api.get<BotStatus>('/bot/status');
  return response.data;
};

export const sendMessage = async (data: { phoneNumber: string; message: string }) => {
  const response = await api.post('/bot/send', data);
  return response.data;
};
