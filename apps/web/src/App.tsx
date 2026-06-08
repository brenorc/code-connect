import { useSyncExternalStore } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { FeedPage } from './components/pages/FeedPage/FeedPage'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { PostDetailPage } from './components/pages/PostDetailPage/PostDetailPage'
import { SignupPage } from './components/pages/SignupPage/SignupPage'

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function Router() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash)

  if (hash === '#/cadastro') return <SignupPage />

  if (hash.startsWith('#/post/')) {
    const postId = hash.slice('#/post/'.length)
    return <PostDetailPage postId={postId} />
  }

  if (hash === '#/feed' || hash === '#/home') return <FeedPage />

  return <LoginPage />
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
