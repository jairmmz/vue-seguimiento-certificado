import { messageError, messageSuccess } from '@/helpers/toastNotification'
import { storeToRefs } from 'pinia'
import type { AxiosResponse } from 'axios'
import { handleAxiosError } from '@/utils/errorHandling'
import { useAuthStore } from '@/stores/auth'
import { Login, LoginResponse } from '../types/auth'
import makeFetch from '@/makeFetch'
import { useRouter } from 'vue-router'

export function useLogin() {
  const { user, token, isLoading } = storeToRefs(useAuthStore())
  const router = useRouter()

  async function login(payload: Login): Promise<{
    success: boolean
    errors?: Record<string, string[]>
  }> {
    isLoading.value = true
    try {
      const response = await makeFetch.post<LoginResponse, AxiosResponse<LoginResponse>, Login>(
        'login',
        payload
      )

      if (response.data.code === 200) {
        messageSuccess(response.data.message)
        user.value = response.data.data.user
        token.value = response.data.data.token
        router.push({ name: 'home' })
      }
      return { success: true }
    } catch (error: any) {
      messageError(error.response.data.data);
      return handleAxiosError(error)
    } finally {
      isLoading.value = false
    }
  }

  return { login }
}
