import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  const defaultProps = {
    id: 'email',
    name: 'email',
    value: '',
    onChange: vi.fn(),
  }

  it('applies the type prop', () => {
    render(<Input {...defaultProps} type="password" />)
    expect(document.getElementById('email')).toHaveAttribute('type', 'password')
  })

  it('displays placeholder text', () => {
    render(<Input {...defaultProps} placeholder="usuario123" />)
    expect(screen.getByPlaceholderText('usuario123')).toBeInTheDocument()
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<Input {...defaultProps} onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with matching id', () => {
    render(<Input {...defaultProps} id="username" />)
    expect(document.getElementById('username')).toBeInTheDocument()
  })
})
