import { apiClient } from '@/shared/api'
import type { Channel, CreateChannelDto } from '../model/channel.types'

export const channelApi = {
  fetchChannels: (serverId: string) => apiClient.get<Channel[]>(`/servers/${serverId}/channels`),

  fetchChannelById: (channelId: string) => apiClient.get<Channel>(`/channels/${channelId}`),

  createChannel: (serverId: string, data: CreateChannelDto) =>
    apiClient.post<Channel>(`/servers/${serverId}/channels`, data),

  updateChannel: (channelId: string, data: Partial<CreateChannelDto>) =>
    apiClient.patch<Channel>(`/channels/${channelId}`, data),

  deleteChannel: (serverId: string, channelId: string) =>
    apiClient.delete(`/servers/${serverId}/channels/${channelId}`),
}
