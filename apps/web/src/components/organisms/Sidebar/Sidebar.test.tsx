import { render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { AuthContext } from '../../../contexts/AuthContext'

function renderWithAuth(user: { id: string; name: string; email: string } | null) {
  const value = {
    user,
    token: user ? 'fake-token' : null,
    login: vi.fn(),
    logout: vi.fn(),
  }
  return render(
    <AuthContext.Provider value={value}>
      <Sidebar />
    </AuthContext.Provider>,
  )
}

describe('Sidebar', () => {
  it('renders nav links', () => {
    renderWithAuth(null)
    expect(screen.getByText('Feed')).toBeInTheDocument()
    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Sobre nós')).toBeInTheDocument()
  })

  it('shows Entrar when user is not logged in', () => {
    renderWithAuth(null)
    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.queryByText('Sair')).not.toBeInTheDocument()
  })

  it('shows Sair when user is logged in', () => {
    renderWithAuth({ id: '1', name: 'Julio Oliveira', email: 'julio@example.com' })
    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument()
  })

  it('shows Publicar button only when logged in and callback is provided', () => {
    renderWithAuth({ id: '1', name: 'Julio Oliveira', email: 'julio@example.com' })
    const { rerender } = render(
      <AuthContext.Provider value={{ user: { id: '1', name: 'Julio', email: 'j@e.com' }, token: 'tok', login: vi.fn(), logout: vi.fn() }}>
        <Sidebar onPublishClick={vi.fn()} />
      </AuthContext.Provider>,
    )
    expect(screen.getByText('Publicar')).toBeInTheDocument()
    rerender(
      <AuthContext.Provider value={{ user: null, token: null, login: vi.fn(), logout: vi.fn() }}>
        <Sidebar onPublishClick={vi.fn()} />
      </AuthContext.Provider>,
    )
    expect(screen.queryByText('Publicar')).not.toBeInTheDocument()
  })
})
