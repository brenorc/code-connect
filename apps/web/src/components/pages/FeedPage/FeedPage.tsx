import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import type { PostResponse } from '../../../services/api'
import { useAuth } from '../../../contexts/AuthContext'
import { SearchBar } from '../../molecules/SearchBar/SearchBar'
import { PostCard } from '../../molecules/PostCard/PostCard'
import { FeedLayout } from '../../templates/FeedLayout/FeedLayout'
import { CreatePostModal } from '../../organisms/CreatePostModal/CreatePostModal'

type SortOption = 'recent' | 'popular'

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-base pb-1 transition-colors ${
        active
          ? 'text-accent font-semibold underline underline-offset-4 decoration-accent'
          : 'text-text-muted font-normal'
      }`}
    >
      {children}
    </button>
  )
}

export function FeedPage() {
  const { user, token } = useAuth()
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOption>('recent')
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function fetchPosts(q: string, s: SortOption) {
    setIsLoading(true)
    try {
      const data = await api.getPosts(q || undefined, s)
      setPosts(data)
    } catch {
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts(query, sort)
    }, query ? 400 : 0)
    return () => clearTimeout(timer)
  }, [query, sort])

  async function handleLike(postId: string) {
    if (!token) return
    try {
      const { count } = await api.likePost(postId, token)
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likesCount: count } : p)),
      )
    } catch {
      // silent
    }
  }

  function handlePostCreated() {
    fetchPosts(query, sort)
  }

  return (
    <FeedLayout onPublishClick={() => setIsModalOpen(true)}>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-6">
            <TabButton active={sort === 'recent'} onClick={() => setSort('recent')}>
              Recentes
            </TabButton>
            <TabButton active={sort === 'popular'} onClick={() => setSort('popular')}>
              Mais curtidos
            </TabButton>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-text-muted text-sm">Carregando posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-text-muted text-sm">
                {query ? 'Nenhum post encontrado para sua busca.' : 'Ainda não há posts.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <a key={post.id} href={`#/post/${post.id}`} className="block hover:opacity-95 transition-opacity">
                  <PostCard
                    post={post}
                    isLoggedIn={!!user}
                    onLike={() => handleLike(post.id)}
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          onCreated={handlePostCreated}
        />
      )}
    </FeedLayout>
  )
}
