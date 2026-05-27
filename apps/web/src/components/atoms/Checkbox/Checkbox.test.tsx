import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  const defaultProps = {
    id: 'remember',
    name: 'remember',
    checked: false,
    onChange: vi.fn(),
    label: 'Lembrar-me',
  }

  it('renders label text', () => {
    render(<Checkbox {...defaultProps} />)
    expect(screen.getByText('Lembrar-me')).toBeInTheDocument()
  })

  it('associates label with input via htmlFor', () => {
    render(<Checkbox {...defaultProps} />)
    const input = screen.getByRole('checkbox')
    expect(input).toHaveAttribute('id', 'remember')
    expect(screen.getByLabelText('Lembrar-me')).toBe(input)
  })

  it('reflects checked state', () => {
    render(<Checkbox {...defaultProps} checked={true} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn()
    render(<Checkbox {...defaultProps} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
