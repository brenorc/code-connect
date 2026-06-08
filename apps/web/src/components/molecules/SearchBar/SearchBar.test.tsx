import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Digite o que você procura')).toBeInTheDocument()
  })

  it('calls onChange when user types', () => {
    const handleChange = vi.fn()
    render(<SearchBar value="" onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'React' } })
    expect(handleChange).toHaveBeenCalledWith('React')
  })

  it('shows clear button when value is present', () => {
    render(<SearchBar value="React" onChange={() => {}} />)
    expect(screen.getByLabelText('Limpar busca')).toBeInTheDocument()
  })

  it('does not show clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.queryByLabelText('Limpar busca')).not.toBeInTheDocument()
  })

  it('calls onChange with empty string when clear button is clicked', () => {
    const handleChange = vi.fn()
    render(<SearchBar value="React" onChange={handleChange} />)
    fireEvent.click(screen.getByLabelText('Limpar busca'))
    expect(handleChange).toHaveBeenCalledWith('')
  })
})
