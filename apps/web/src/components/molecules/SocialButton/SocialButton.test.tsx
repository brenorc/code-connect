import { render, screen, fireEvent } from '@testing-library/react'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  const defaultProps = {
    iconSrc: '/Github.png',
    iconAlt: 'Github',
    label: 'Github',
  }

  it('renders icon with alt text', () => {
    render(<SocialButton {...defaultProps} />)
    expect(screen.getByAltText('Github')).toBeInTheDocument()
  })

  it('renders label text', () => {
    render(<SocialButton {...defaultProps} />)
    expect(screen.getByText('Github')).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<SocialButton {...defaultProps} href="/auth/github" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/auth/github')
  })

  it('renders as a button when no href', () => {
    render(<SocialButton {...defaultProps} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn()
    render(<SocialButton {...defaultProps} onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
