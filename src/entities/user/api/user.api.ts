import { apiClient } from '@/shared/api'
import type { User, CurrentUser } from '../model/user.types'

export const userApi = {
  fetchCurrentUser: () => apiClient.get<CurrentUser>('/users/@me'),

  updateCurrentUser: (data: Partial<CurrentUser>) =>
    apiClient.patch<CurrentUser>('/users/@me', data),

  updateUserAccount: (data: Partial<User>) =>
    apiClient.patch<CurrentUser>('/users/@me/account', data),

  fetchRecentAvatars: () => apiClient.get<User[]>('/users/@me/avatars'),

  deleteRecentAvatar: (avatarId: string) => apiClient.delete(`/users/@me/avatars/${avatarId}`),

  fetchUserById: (userId: string) => apiClient.get<User>(`/users/${userId}`),

  fetchUserProfile: (userId: string) => apiClient.get<User>(`/users/${userId}`),

  updateUserProfile: (userId: string, data: Partial<User>) =>
    apiClient.patch<User>(`/users/${userId}`, data),

  fetchRelationShips: (userId: string) => apiClient.get(`/users/${userId}/relationships`),
}
