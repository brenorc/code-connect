import { createContext, useContext, useState } from 'react'
import type { UserResponse } from '../services/api'

interface AuthContextValue {
  user: UserResponse | null
  token: string | null
  login: (token: string, user: UserResponse) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function safeGet(key: string): string | null {
  try {
    return localStorage?.getItem?.(key) ?? null
  } catch {
    return null
  }
}

function safeSave(key: string, value: string) {
  try {
    localStorage?.setItem?.(key, value)
  } catch {
    // test environment may not support localStorage
  }
}

function safeRemove(key: string) {
  try {
    localStorage?.removeItem?.(key)
  } catch {
    // test environment may not support localStorage
  }
}

function getStoredToken(): string | null {
  return safeGet('token')
}

function getStoredUser(): UserResponse | null {
  try {
    const raw = safeGet('code_connect_user')
    return raw ? (JSON.parse(raw) as UserResponse) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(getStoredUser)
  const [token, setToken] = useState<string | null>(getStoredToken)

  function login(newToken: string, newUser: UserResponse) {
    safeSave('token', newToken)
    safeSave('code_connect_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  function logout() {
    safeRemove('token')
    safeRemove('code_connect_user')
    setToken(null)
    setUser(null)
    window.location.hash = '#/'
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
