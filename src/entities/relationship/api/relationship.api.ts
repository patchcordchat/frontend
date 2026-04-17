import { apiClient } from '@/shared/api'
import type { Relationship } from '../model/relationship.types'

export const relationshipApi = {
  fetchRelationships: () => apiClient.get<Relationship[]>(`/users/@me/relationships`),

  sendFriendRequest: (payload: { username: string }) =>
    apiClient.post<void>(`/users/@me/relationships`, payload),

  createRelationship: (userId: string, payload: { type: number }) =>
    apiClient.put(`/users/@me/relationships/${userId}`, payload),

  updateRelationship: (userId: string, payload: { nickname: string }) =>
    apiClient.patch(`/users/@me/relationships/${userId}`, payload),

  deleteRelationship: (userId: string) => apiClient.delete(`/users/@me/relationships/${userId}`),

  bulkDeleteRelationships: () => apiClient.delete(`/users/@me/relationships`),

  bulkAddRelationships: (payload: { userIds: string[] }) =>
    apiClient.post(`/users/@me/relationships/bulk`, payload),

  ignoreUser: (userId: string) => apiClient.put(`/users/@me/relationships/${userId}/ignore`),

  unignoreUser: (userId: string) => apiClient.delete(`/users/@me/relationships/${userId}/ignore`),
}
