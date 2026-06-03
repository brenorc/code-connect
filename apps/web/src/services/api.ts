import axios, { isAxiosError } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
})

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  access_token: string
}

export const api = {
  register: (payload: RegisterPayload): Promise<UserResponse> =>
    http.post<UserResponse>('/users', payload).then((r) => r.data),

  login: (payload: LoginPayload): Promise<LoginResponse> =>
    http.post<LoginResponse>('/auth/login', payload).then((r) => r.data),

  getMe: (token: string): Promise<UserResponse> =>
    http
      .get<UserResponse>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => r.data),
}

export { isAxiosError }
