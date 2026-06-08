import { render, screen, waitFor } from '@testing-library/react'
import { FeedPage } from './FeedPage'
import { AuthContext } from '../../../contexts/AuthContext'
import { vi } from 'vitest'

vi.mock('../../../services/api', () => ({
  api: {
    getPosts: vi.fn().mockResolvedValue([
      {
        id: '1',
        title: 'Post React',
        description: 'Descrição',
        thumbnailUrl: null,
        tags: ['React'],
        likesCount: 2,
        commentsCount: 1,
        author: { id: 'u1', name: 'Julio Oliveira' },
        createdAt: '2024-01-01T00:00:00Z',
      },
    ]),
  },
  isAxiosError: vi.fn(),
}))

function renderFeedPage(user = null) {
  return render(
    <AuthContext.Provider value={{ user, token: null, login: vi.fn(), logout: vi.fn() }}>
      <FeedPage />
    </AuthContext.Provider>,
  )
}

describe('FeedPage', () => {
  it('renders the search bar', async () => {
    renderFeedPage()
    expect(screen.getByLabelText('Buscar posts')).toBeInTheDocument()
  })

  it('renders tab buttons', async () => {
    renderFeedPage()
    expect(screen.getByText('Recentes')).toBeInTheDocument()
    expect(screen.getByText('Mais curtidos')).toBeInTheDocument()
  })

  it('renders posts after loading', async () => {
    renderFeedPage()
    await waitFor(() => {
      expect(screen.getByText('Post React')).toBeInTheDocument()
    })
  })
})
