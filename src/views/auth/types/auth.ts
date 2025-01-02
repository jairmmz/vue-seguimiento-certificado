export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

export interface Login {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  data: {
    user: User
    token: string
  }
  code: number
}

export interface Register {
  name: string
  email: string
  password: string
  password_confirmation: string
}
