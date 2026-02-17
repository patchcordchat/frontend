import { apiClient } from '@/shared/api'
import type { Message, CreateMessageDto } from '../model/message.types'

export const messageApi = {
  fetchMessages: (channelId: string) => apiClient.get<Message[]>(`/channels/${channelId}/messages`),

  fetchMessageById: (channelId: string, messageId: string) =>
    apiClient.get<Message>(`/channels/${channelId}/messages/${messageId}`),

  createMessage: (channelId: string, payload: CreateMessageDto) =>
    apiClient.post<Message>(`/channels/${channelId}/messages`, payload),

  updateMessage: (channelId: string, data: Partial<CreateMessageDto>) =>
    apiClient.patch<Message>(`/channels/${channelId}`, data),

  deleteMessage: (serverId: string, channelId: string) =>
    apiClient.delete(`/servers/${serverId}/channels/${channelId}`),
}
