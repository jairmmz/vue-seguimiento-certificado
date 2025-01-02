import axios, { AxiosError } from 'axios'

export function handleAxiosError(error: unknown): {
  success: boolean
  errors?: Record<string, string[]>
} {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ errors?: Record<string, string[]> }>
    if (axiosError.response?.status === 422) {
      return {
        success: false,
        errors: axiosError.response.data.errors
      }
    }
  }
  return { success: false }
}
