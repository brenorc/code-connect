import { render, screen, fireEvent } from '@testing-library/react'
import { PostCard } from './PostCard'
import type { PostResponse } from '../../../services/api'

const mockPost: PostResponse = {
  id: '1',
  title: 'Post de teste',
  description: 'Descrição do post de teste',
  thumbnailUrl: null,
  tags: ['React', 'TypeScript'],
  likesCount: 5,
  commentsCount: 3,
  author: { id: 'u1', name: 'Julio Oliveira' },
  createdAt: '2024-01-01T00:00:00Z',
}

describe('PostCard', () => {
  it('renders post title and description', () => {
    render(<PostCard post={mockPost} isLoggedIn={false} />)
    expect(screen.getByText('Post de teste')).toBeInTheDocument()
    expect(screen.getByText('Descrição do post de teste')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<PostCard post={mockPost} isLoggedIn={false} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders like and comment counts', () => {
    render(<PostCard post={mockPost} isLoggedIn={false} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders author username', () => {
    render(<PostCard post={mockPost} isLoggedIn={false} />)
    expect(screen.getByText('@julio')).toBeInTheDocument()
  })

  it('renders placeholder when thumbnailUrl is null', () => {
    render(<PostCard post={mockPost} isLoggedIn={false} />)
    const placeholderIcon = screen.getAllByText('code').find(
      (el) => el.tagName.toLowerCase() === 'span' && el.className.includes('material-icons'),
    )
    expect(placeholderIcon).toBeInTheDocument()
  })

  it('renders image when thumbnailUrl is set', () => {
    const postWithImage = { ...mockPost, thumbnailUrl: 'https://example.com/img.png' }
    render(<PostCard post={postWithImage} isLoggedIn={false} />)
    expect(screen.getByAltText(/Thumbnail do post/)).toBeInTheDocument()
  })

  it('action buttons are disabled when user is not logged in', () => {
    render(<PostCard post={mockPost} isLoggedIn={false} />)
    expect(screen.getByLabelText('Curtir post')).toBeDisabled()
    expect(screen.getByLabelText('Comentar post')).toBeDisabled()
  })

  it('calls onLike when like button is clicked and user is logged in', () => {
    const handleLike = vi.fn()
    render(<PostCard post={mockPost} isLoggedIn={true} onLike={handleLike} />)
    fireEvent.click(screen.getByLabelText('Curtir post'))
    expect(handleLike).toHaveBeenCalledTimes(1)
  })
})
