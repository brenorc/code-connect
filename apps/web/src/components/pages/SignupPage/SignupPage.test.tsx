import { render, screen } from '@testing-library/react'
import { SignupPage } from './SignupPage'

describe('SignupPage', () => {
  it('renders Cadastro heading', () => {
    render(<SignupPage />)
    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
  })

  it('renders name, email and password fields', () => {
    render(<SignupPage />)
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<SignupPage />)
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument()
  })

  it('renders Github and Gmail social buttons', () => {
    render(<SignupPage />)
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('renders the login footer link', () => {
    render(<SignupPage />)
    expect(screen.getByRole('link', { name: /Faça seu login/i })).toBeInTheDocument()
  })

  it('renders the banner image', () => {
    render(<SignupPage />)
    expect(screen.getByAltText(/Pessoa programando/i)).toBeInTheDocument()
  })
})
