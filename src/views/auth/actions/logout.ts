import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import makeFetch from '@/makeFetch'
import { useRouter } from 'vue-router'

export function useLogout() {
  const { isLoading } = storeToRefs(useAuthStore())
  const router = useRouter()

  async function logout() {
    isLoading.value = true
    try {
      await makeFetch.post('logout')
      useAuthStore().$reset()
      router.push({ name: 'boxed-signin' })
    } catch (error: any) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  return { logout }
}
