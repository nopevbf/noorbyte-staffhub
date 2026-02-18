import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBotLogs, getBotStatus, sendMessage } from '@/services/botService';

export const useBotLogs = () => {
  return useQuery({
    queryKey: ['bot', 'logs'],
    queryFn: getBotLogs,
    refetchInterval: 5000, // Poll every 5 seconds for new messages
  });
};

export const useBotStatus = () => {
  return useQuery({
    queryKey: ['bot', 'status'],
    queryFn: getBotStatus,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bot', 'logs'] });
    },
  });
};
