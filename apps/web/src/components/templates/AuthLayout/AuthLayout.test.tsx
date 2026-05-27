import { render, screen } from '@testing-library/react'
import { AuthLayout } from './AuthLayout'

describe('AuthLayout', () => {
  it('renders banner image with correct alt text', () => {
    render(
      <AuthLayout bannerSrc="/Banner.png" bannerAlt="Pessoa programando">
        <p>Conteúdo</p>
      </AuthLayout>,
    )
    expect(screen.getByAltText('Pessoa programando')).toBeInTheDocument()
  })

  it('renders banner with correct src', () => {
    render(
      <AuthLayout bannerSrc="/Banner.png" bannerAlt="Banner">
        <p>Conteúdo</p>
      </AuthLayout>,
    )
    expect(screen.getByRole('img')).toHaveAttribute('src', '/Banner.png')
  })

  it('renders children inside main', () => {
    render(
      <AuthLayout bannerSrc="/Banner.png" bannerAlt="Banner">
        <p>Formulário aqui</p>
      </AuthLayout>,
    )
    expect(screen.getByText('Formulário aqui')).toBeInTheDocument()
  })

  it('banner aside has hidden class for mobile', () => {
    render(
      <AuthLayout bannerSrc="/Banner.png" bannerAlt="Banner">
        <p>content</p>
      </AuthLayout>,
    )
    const aside = screen.getByRole('img').closest('aside')
    expect(aside).toHaveClass('hidden')
  })
})
