import { render, screen } from '@testing-library/react'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('renders children', () => {
    render(<TextLink href="/login">Entrar</TextLink>)
    expect(screen.getByText('Entrar')).toBeInTheDocument()
  })

  it('has the correct href', () => {
    render(<TextLink href="/forgot">Esqueci a senha</TextLink>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/forgot')
  })

  it('defaults to accent variant', () => {
    render(<TextLink href="#">Link</TextLink>)
    expect(screen.getByRole('link')).toHaveClass('text-accent')
  })

  it('applies muted variant classes', () => {
    render(<TextLink href="#" variant="muted">Link</TextLink>)
    expect(screen.getByRole('link')).toHaveClass('text-text-muted')
  })
})
