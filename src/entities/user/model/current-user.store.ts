import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userApi } from '../api/user.api'
import { type CurrentUser } from './user.types'

export const useCurrentUserStore = defineStore('current-user', () => {
  // State
  const currentUser = ref<CurrentUser>()

  // Actions
  /**
   * Загрузить текущего пользователя
   */
  const fetchCurrentUser = async () => {
    try {
      const { data } = await userApi.fetchCurrentUser()

      currentUser.value = data
    } catch (err) {
      console.error('Error fetching servers:', err)
      throw err
    }
  }

  /**
   * Обновить текущего пользователя
   */
  const updateCurrentUser = async (payload: Partial<CurrentUser>) => {
    try {
      const { data } = await userApi.updateCurrentUser(payload)
      currentUser.value = data
    } catch (err) {
      console.error('Error updating user:', err)
      throw err
    }
  }

  /**
   * Сбросить состояние
   */
  const $reset = () => {
    currentUser.value = undefined
  }

  return {
    // State
    currentUser,

    // Actions
    fetchCurrentUser,
    updateCurrentUser,
    $reset,
  }
})
