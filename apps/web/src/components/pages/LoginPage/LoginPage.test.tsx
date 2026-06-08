import { render, screen } from '@testing-library/react'
import { AuthProvider } from '../../../contexts/AuthContext'
import { LoginPage } from './LoginPage'

function renderLoginPage() {
  return render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>,
  )
}

describe('LoginPage', () => {
  it('renders Login heading', () => {
    renderLoginPage()
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    renderLoginPage()
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })

  it('renders Github and Gmail social buttons', () => {
    renderLoginPage()
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('renders the signup footer link', () => {
    renderLoginPage()
    expect(screen.getByRole('link', { name: /Crie seu cadastro/i })).toBeInTheDocument()
  })

  it('renders the banner image', () => {
    renderLoginPage()
    expect(screen.getByAltText(/Pessoa programando/i)).toBeInTheDocument()
  })
})
