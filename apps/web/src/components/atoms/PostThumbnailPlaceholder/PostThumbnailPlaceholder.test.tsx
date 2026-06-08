import { render, screen } from '@testing-library/react'
import { PostThumbnailPlaceholder } from './PostThumbnailPlaceholder'

describe('PostThumbnailPlaceholder', () => {
  it('renders the placeholder container', () => {
    const { container } = render(<PostThumbnailPlaceholder />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders the code icon', () => {
    render(<PostThumbnailPlaceholder />)
    expect(screen.getByText('code')).toBeInTheDocument()
  })
})
