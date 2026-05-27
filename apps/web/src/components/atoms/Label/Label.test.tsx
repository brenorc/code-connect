import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label', () => {
  it('renders children', () => {
    render(<Label htmlFor="email">Email ou usuário</Label>)
    expect(screen.getByText('Email ou usuário')).toBeInTheDocument()
  })

  it('has the correct htmlFor attribute', () => {
    render(<Label htmlFor="email">Email</Label>)
    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', 'email')
  })
})
