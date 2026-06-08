import { useAuth } from '../../../contexts/AuthContext'

interface SidebarProps {
  onPublishClick?: () => void
}

interface NavItemProps {
  icon: string
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

function NavItem({ icon, label, href, onClick, active }: NavItemProps) {
  const classes = `flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors w-full text-center ${
    active ? 'text-text-strong' : 'text-text-muted hover:text-text'
  }`

  if (href) {
    return (
      <a href={href} className={classes}>
        <span className="material-icons" style={{ fontSize: '28px' }}>{icon}</span>
        <span className="text-sm">{label}</span>
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${classes} cursor-pointer`}>
      <span className="material-icons" style={{ fontSize: '28px' }}>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-accent font-bold text-lg leading-none">
        {'</>'}
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-accent font-semibold text-sm">code</span>
        <span className="text-text-strong font-semibold text-sm">connect</span>
      </div>
    </div>
  )
}

export function Sidebar({ onPublishClick }: SidebarProps) {
  const { user, logout } = useAuth()
  const currentHash = window.location.hash

  return (
    <aside
      className="bg-surface rounded-lg flex flex-col gap-10 items-center px-4 py-10 self-stretch min-w-[160px]"
      aria-label="Menu de navegação"
    >
      <Logo />

      <nav className="flex flex-col items-center gap-6 w-full">
        {user && onPublishClick && (
          <button
            type="button"
            onClick={onPublishClick}
            className="w-full border border-accent text-accent text-sm font-semibold py-3 px-4 rounded-lg hover:bg-accent hover:text-accent-fg transition-colors"
          >
            Publicar
          </button>
        )}

        <NavItem
          icon="feed"
          label="Feed"
          href="#/feed"
          active={currentHash === '#/feed' || currentHash.startsWith('#/post/')}
        />
        <NavItem icon="account_circle" label="Perfil" href="#/perfil" />
        <NavItem icon="info" label="Sobre nós" href="#/sobre" />

        {user ? (
          <NavItem icon="logout" label="Sair" onClick={logout} />
        ) : (
          <NavItem icon="login" label="Entrar" href="#/" />
        )}
      </nav>
    </aside>
  )
}
