import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    user_id: null as string | null,
    isAuthenticated: false,
  }),

  actions: {
    setUserId(userId: string) {
      this.user_id = userId
      this.isAuthenticated = true
    },

    clearSession() {
      this.user_id = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },

  getters: {
    userId: (state) => state.user_id ?? null,
  },
})
