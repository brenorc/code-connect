import { render, screen, waitFor } from '@testing-library/react'
import { PostDetailPage } from './PostDetailPage'
import { AuthContext } from '../../../contexts/AuthContext'
import { vi } from 'vitest'

vi.mock('../../../services/api', () => ({
  api: {
    getPost: vi.fn().mockResolvedValue({
      id: '1',
      title: 'Post detalhado',
      description: 'Descrição completa',
      thumbnailUrl: null,
      tags: ['React'],
      likesCount: 3,
      commentsCount: 1,
      author: { id: 'u1', name: 'Julio Oliveira' },
      createdAt: '2024-01-01T00:00:00Z',
      comments: [
        {
          id: 'c1',
          content: 'Ótimo post!',
          author: { id: 'u2', name: 'Ana Lima' },
          createdAt: '2024-01-02T00:00:00Z',
        },
      ],
    }),
  },
  isAxiosError: vi.fn(),
}))

function renderDetail(user = null) {
  return render(
    <AuthContext.Provider value={{ user, token: null, login: vi.fn(), logout: vi.fn() }}>
      <PostDetailPage postId="1" />
    </AuthContext.Provider>,
  )
}

describe('PostDetailPage', () => {
  it('renders post title after loading', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Post detalhado')).toBeInTheDocument()
    })
  })

  it('renders comments', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Ótimo post!')).toBeInTheDocument()
    })
  })

  it('shows login prompt when user is not logged in', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText(/Faça login/)).toBeInTheDocument()
    })
  })

  it('shows comment form when user is logged in', async () => {
    renderDetail({ id: 'u1', name: 'Julio', email: 'j@e.com' })
    await waitFor(() => {
      expect(screen.getByLabelText('Escreva um comentário')).toBeInTheDocument()
    })
  })
})
