import { apiClient } from '@/shared/api'
import type { Server, CreateServerDto } from '../model/server.types'

export const serverApi = {
  getServers: () => apiClient.get<Server[]>('/servers'),

  getServerById: (id: string) => apiClient.get<Server>(`/servers/${id}`),

  createServer: (data: CreateServerDto) => apiClient.post<Server>('/servers', data),

  updateServer: (id: string, data: Partial<CreateServerDto>) =>
    apiClient.patch<Server>(`/servers/${id}`, data),

  deleteServer: (id: string) => apiClient.delete(`/servers/${id}`),
}
