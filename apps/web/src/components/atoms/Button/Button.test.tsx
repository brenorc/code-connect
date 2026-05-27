import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Entrar</Button>)
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when loading is true', () => {
    render(<Button loading>Entrar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows "Carregando..." text when loading', () => {
    render(<Button loading>Entrar</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Carregando...')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Entrar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders trailingIcon when not loading', () => {
    render(<Button trailingIcon={<span data-testid="icon">→</span>}>Login</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
