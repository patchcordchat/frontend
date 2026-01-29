import { defineStore } from 'pinia'
import type { User } from './types'

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    clearSession() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },

  getters: {
    userName: (state) => state.user?.name ?? 'Unknown',
  },
})
