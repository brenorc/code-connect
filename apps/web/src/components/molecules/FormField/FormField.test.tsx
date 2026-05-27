import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'
import { Input } from '../../atoms/Input/Input'

describe('FormField', () => {
  it('renders the label text', () => {
    render(
      <FormField id="email" label="Email ou usuário">
        <Input id="email" name="email" value="" onChange={vi.fn()} />
      </FormField>,
    )
    expect(screen.getByText('Email ou usuário')).toBeInTheDocument()
  })

  it('label htmlFor wires to child input id', () => {
    render(
      <FormField id="email" label="Email ou usuário">
        <Input id="email" name="email" value="" onChange={vi.fn()} />
      </FormField>,
    )
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FormField id="pass" label="Senha">
        <input id="pass" type="password" data-testid="pass-input" readOnly />
      </FormField>,
    )
    expect(screen.getByTestId('pass-input')).toBeInTheDocument()
  })
})
