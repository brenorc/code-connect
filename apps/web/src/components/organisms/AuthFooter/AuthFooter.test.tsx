import { render, screen } from '@testing-library/react'
import { AuthFooter } from './AuthFooter'

describe('AuthFooter', () => {
  const defaultProps = {
    promptText: 'Ainda não tem conta?',
    linkLabel: 'Crie seu cadastro!',
    linkHref: '#',
  }

  it('renders prompt text', () => {
    render(<AuthFooter {...defaultProps} />)
    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
  })

  it('renders link with correct label and href', () => {
    render(<AuthFooter {...defaultProps} />)
    const link = screen.getByRole('link', { name: /Crie seu cadastro!/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#')
  })

  it('renders trailingIcon when provided', () => {
    render(<AuthFooter {...defaultProps} trailingIcon="📋" />)
    expect(screen.getByText('📋')).toBeInTheDocument()
  })

  it('does not render trailingIcon span when not provided', () => {
    const { container } = render(<AuthFooter {...defaultProps} />)
    expect(container.querySelector('span')).not.toBeInTheDocument()
  })
})
