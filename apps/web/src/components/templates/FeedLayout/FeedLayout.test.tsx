import { render, screen } from '@testing-library/react'
import { FeedLayout } from './FeedLayout'
import { AuthContext } from '../../../contexts/AuthContext'

function renderLayout(children = <p>Conteúdo</p>) {
  return render(
    <AuthContext.Provider value={{ user: null, token: null, login: vi.fn(), logout: vi.fn() }}>
      <FeedLayout>{children}</FeedLayout>
    </AuthContext.Provider>,
  )
}

describe('FeedLayout', () => {
  it('renders children', () => {
    renderLayout()
    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })

  it('renders the sidebar nav', () => {
    renderLayout()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
