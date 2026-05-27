import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders an hr when no label is provided', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders label text when provided', () => {
    render(<Divider label="ou entre com outras contas" />)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })

  it('does not render an hr when label is provided', () => {
    const { container } = render(<Divider label="ou" />)
    expect(container.querySelector('hr')).not.toBeInTheDocument()
  })
})
