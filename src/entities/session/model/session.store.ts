import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { sessionApi } from '../api'
import type { LoginDto, RegisterDto } from './session.types'

export const useSessionStore = defineStore('session', () => {
  // State
  const user_id = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const token = computed(() => localStorage.getItem('token') ?? null)

  // Actions
  const register = async (payload: RegisterDto) => {
    try {
      const { data } = await sessionApi.register(payload)

      user_id.value = data.user_id
      localStorage.setItem('token', data.token)
      isAuthenticated.value = true
    } catch (err) {
      console.error('Error logging in:', err)
      throw err
    }
  }

  const login = async (payload: LoginDto) => {
    try {
      const { data } = await sessionApi.login(payload)

      localStorage.setItem('token', data.token)
      user_id.value = data.user_id
      isAuthenticated.value = true
    } catch (err) {
      console.error('Error logging in:', err)
      throw err
    }
  }

  const logout = async () => {
    try {
      await sessionApi.logout()
      $reset()
    } catch (err) {
      console.error('Error logging out:', err)
      throw err
    }
  }

  /**
   * Сбросить состояние
   */
  const $reset = () => {
    user_id.value = null
    isAuthenticated.value = false
  }

  return {
    // State
    user_id,
    token,
    isAuthenticated,

    // Actions
    register,
    login,
    logout,
    $reset,
  }
})
