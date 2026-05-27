import { render, screen } from '@testing-library/react'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders Login heading', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })

  it('renders Github and Gmail social buttons', () => {
    render(<LoginPage />)
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('renders the signup footer link', () => {
    render(<LoginPage />)
    expect(screen.getByRole('link', { name: /Crie seu cadastro/i })).toBeInTheDocument()
  })

  it('renders the banner image', () => {
    render(<LoginPage />)
    expect(screen.getByAltText(/Pessoa programando/i)).toBeInTheDocument()
  })
})
