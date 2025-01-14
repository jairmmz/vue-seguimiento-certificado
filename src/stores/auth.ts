import { User } from '@/views/auth/types/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    token: null as string | null,
    isLoading: false
  }),

  getters: {},
  
  actions: {},

  persist: [
    {
      key: 'auth',
      pick: ['user', 'token'],
      storage: sessionStorage,
    }
  ]
})
