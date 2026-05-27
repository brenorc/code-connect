import { render, screen } from '@testing-library/react'
import { SocialLoginRow } from './SocialLoginRow'

const providers = [
  { id: 'github', label: 'Github', iconSrc: '/Github.png' },
  { id: 'gmail', label: 'Gmail', iconSrc: '/Gmail.png' },
]

describe('SocialLoginRow', () => {
  it('renders one button per provider', () => {
    render(<SocialLoginRow providers={providers} />)
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('renders correct labels for each provider', () => {
    render(<SocialLoginRow providers={providers} />)
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByText('Gmail')).toBeInTheDocument()
  })

  it('renders icon images with correct alt text', () => {
    render(<SocialLoginRow providers={providers} />)
    expect(screen.getByAltText('Github')).toBeInTheDocument()
    expect(screen.getByAltText('Gmail')).toBeInTheDocument()
  })
})
