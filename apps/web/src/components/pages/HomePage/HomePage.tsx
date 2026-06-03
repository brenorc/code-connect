import type { UserResponse } from '../../../services/api'

interface HomePageProps {
  user: UserResponse
  onLogout: () => void
}

export function HomePage({ user, onLogout }: HomePageProps) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="bg-surface rounded-2xl p-8 flex flex-col gap-6 w-full max-w-sm border border-border">
        <header>
          <h1 className="text-text-strong text-3xl font-semibold tracking-tight">
            Olá, {user.name}!
          </h1>
          <p className="text-text mt-2 text-base">{user.email}</p>
        </header>

        <button
          onClick={onLogout}
          className="bg-accent text-accent-fg text-sm font-semibold rounded-lg py-3 px-6 hover:opacity-90 transition-opacity"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
