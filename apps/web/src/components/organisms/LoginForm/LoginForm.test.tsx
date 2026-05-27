import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('calls onSubmit with form values when submitted', async () => {
    const handleSubmit = vi.fn()
    render(<LoginForm onSubmit={handleSubmit} />)

    await userEvent.type(screen.getByRole('textbox'), 'usuario123')
    await userEvent.type(screen.getByLabelText('Senha'), '123456')
    fireEvent.submit(document.querySelector('form')!)

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ emailOrUsername: 'usuario123', password: '123456' }),
    )
  })

  it('shows error message when errorMessage prop is provided', () => {
    render(<LoginForm onSubmit={vi.fn()} errorMessage="Credenciais inválidas" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Credenciais inválidas')
  })

  it('disables submit button when isSubmitting', () => {
    render(<LoginForm onSubmit={vi.fn()} isSubmitting />)
    expect(screen.getByRole('button', { name: /Carregando/i })).toBeDisabled()
  })

  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })
})
