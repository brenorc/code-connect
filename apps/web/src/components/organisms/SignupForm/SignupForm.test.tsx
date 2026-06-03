import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignupForm } from './SignupForm'

describe('SignupForm', () => {
  it('calls onSubmit with form values when submitted', async () => {
    const handleSubmit = vi.fn()
    render(<SignupForm onSubmit={handleSubmit} />)

    await userEvent.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await userEvent.type(screen.getByLabelText('Email'), 'maria@example.com')
    await userEvent.type(screen.getByLabelText('Senha'), '123456')
    fireEvent.submit(document.querySelector('form')!)

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Maria Silva',
        email: 'maria@example.com',
        password: '123456',
      }),
    )
  })

  it('renders name, email and password fields', () => {
    render(<SignupForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('shows error message when errorMessage prop is provided', () => {
    render(<SignupForm onSubmit={vi.fn()} errorMessage="Email já cadastrado" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Email já cadastrado')
  })

  it('disables submit button when isSubmitting', () => {
    render(<SignupForm onSubmit={vi.fn()} isSubmitting />)
    expect(screen.getByRole('button', { name: /Carregando/i })).toBeDisabled()
  })
})
