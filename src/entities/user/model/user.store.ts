import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { userApi } from '../api/user.api'
import { type User } from './user.types'

export const useUserStore = defineStore('user', () => {
  // State
  const users = reactive<Record<User['id'], User>>({})
  const userProfiles = reactive<Record<User['id'], User>>({})

  // Actions
  /**
   * Загрузить пользователя по ID
   */
  const fetchCurrentUser = async (userId: string) => {
    try {
      const { data: user } = await userApi.fetchUserById(userId)

      users[user.id] = user
    } catch (err) {
      console.error('Error fetching servers:', err)
      throw err
    }
  }

  /**
   * Получить профиль пользователя по ID
   */
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data } = await userApi.fetchUserProfile(userId)

      userProfiles[userId] = data
    } catch (err) {
      console.error('Error updating user:', err)
      throw err
    }
  }

  /**
   * Сбросить состояние
   */
  const $reset = () => {
    Object.entries(users).forEach(([id]) => {
      delete users[id]
    })
  }

  return {
    // State
    users,

    // Actions
    fetchCurrentUser,
    fetchUserProfile,
    $reset,
  }
})
