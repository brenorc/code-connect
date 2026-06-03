import { useSyncExternalStore } from 'react'
import { HomePage } from './components/pages/HomePage/HomePage'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { SignupPage } from './components/pages/SignupPage/SignupPage'
import type { UserResponse } from './services/api'

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getStoredUser(): UserResponse | null {
  try {
    const raw = localStorage.getItem('code_connect_user')
    return raw ? (JSON.parse(raw) as UserResponse) : null
  } catch {
    return null
  }
}

export default function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('code_connect_user')
    window.location.hash = '#/'
  }

  if (hash === '#/home') {
    const user = getStoredUser()
    if (user) return <HomePage user={user} onLogout={handleLogout} />
    window.location.hash = '#/'
  }

  if (hash === '#/cadastro') return <SignupPage />

  return <LoginPage />
}
