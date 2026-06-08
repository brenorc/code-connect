import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import type { CommentResponse, PostDetailResponse } from '../../../services/api'
import { useAuth } from '../../../contexts/AuthContext'
import { FeedLayout } from '../../templates/FeedLayout/FeedLayout'
import { PostThumbnailPlaceholder } from '../../atoms/PostThumbnailPlaceholder/PostThumbnailPlaceholder'

interface PostDetailPageProps {
  postId: string
}

function CommentItem({ comment }: { comment: CommentResponse }) {
  const initials = comment.author.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-fg text-xs font-semibold shrink-0">
        {initials}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-text-muted text-sm font-semibold">
          @{comment.author.name.split(' ')[0].toLowerCase()}
        </span>
        <p className="text-text text-sm leading-relaxed">{comment.content}</p>
      </div>
    </div>
  )
}

export function PostDetailPage({ postId }: PostDetailPageProps) {
  const { user, token } = useAuth()
  const [post, setPost] = useState<PostDetailResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      try {
        const data = await api.getPost(postId)
        setPost(data)
      } catch {
        setPost(null)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [postId])

  async function handleLike() {
    if (!token || !post) return
    try {
      const { liked: newLiked, count } = await api.likePost(post.id, token)
      setLiked(newLiked)
      setPost((prev) => (prev ? { ...prev, likesCount: count } : prev))
    } catch {
      // silent
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault()
    if (!token || !post || !commentText.trim()) return
    setIsSubmittingComment(true)
    try {
      const newComment = await api.createComment(post.id, commentText.trim(), token)
      setPost((prev) =>
        prev
          ? { ...prev, comments: [newComment, ...prev.comments], commentsCount: prev.commentsCount + 1 }
          : prev,
      )
      setCommentText('')
    } catch {
      // silent
    } finally {
      setIsSubmittingComment(false)
    }
  }

  if (isLoading) {
    return (
      <FeedLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-text-muted text-sm">Carregando post...</p>
        </div>
      </FeedLayout>
    )
  }

  if (!post) {
    return (
      <FeedLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-text-muted text-sm">Post não encontrado.</p>
          <a href="#/feed" className="text-accent text-sm hover:underline">
            Voltar ao feed
          </a>
        </div>
      </FeedLayout>
    )
  }

  return (
    <FeedLayout>
      <article className="flex flex-col gap-8 max-w-3xl">
        <a href="#/feed" className="flex items-center gap-1 text-text-muted text-sm hover:text-text transition-colors w-fit">
          <span className="material-icons" style={{ fontSize: '18px' }}>arrow_back</span>
          Voltar ao feed
        </a>

        {post.thumbnailUrl ? (
          <div className="rounded-xl overflow-hidden max-h-[400px]">
            <img
              src={post.thumbnailUrl}
              alt={`Thumbnail: ${post.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden">
            <PostThumbnailPlaceholder />
          </div>
        )}

        <div className="bg-surface rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-text-strong text-3xl font-semibold leading-snug">{post.title}</h1>
            <p className="text-text text-base leading-relaxed">{post.description}</p>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-border text-text-muted text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={handleLike}
                disabled={!user}
                aria-label="Curtir post"
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  !user
                    ? 'text-text-muted cursor-not-allowed opacity-60'
                    : liked
                    ? 'text-accent cursor-pointer'
                    : 'text-text-muted hover:text-accent cursor-pointer'
                }`}
              >
                <span className="material-icons" style={{ fontSize: '22px' }}>code</span>
                <span className="text-xs">{post.likesCount}</span>
              </button>

              <div className="flex flex-col items-center gap-0.5 text-text-muted">
                <span className="material-icons" style={{ fontSize: '22px' }}>chat</span>
                <span className="text-xs">{post.commentsCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-fg text-xs font-semibold">
                {post.author.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
              </div>
              <span className="text-text-muted text-sm font-semibold">
                @{post.author.name.split(' ')[0].toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <section aria-label="Comentários" className="flex flex-col gap-4">
          <h2 className="text-text-strong text-xl font-semibold">
            Comentários ({post.commentsCount})
          </h2>

          {user && (
            <form onSubmit={handleComment} className="flex flex-col gap-3 bg-surface rounded-xl p-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
                rows={3}
                className="w-full bg-input-bg text-text-strong text-sm rounded-lg p-3 placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent resize-none"
                aria-label="Escreva um comentário"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingComment || !commentText.trim()}
                  className="bg-accent text-accent-fg text-sm font-semibold py-2 px-6 rounded-lg hover:brightness-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmittingComment ? 'Enviando...' : 'Comentar'}
                </button>
              </div>
            </form>
          )}

          {!user && (
            <p className="text-text-muted text-sm bg-surface rounded-xl p-4">
              <a href="#/" className="text-accent hover:underline">Faça login</a> para comentar.
            </p>
          )}

          {post.comments.length > 0 ? (
            <div className="bg-surface rounded-xl px-4">
              {post.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-sm text-center py-8">
              Ainda não há comentários. Seja o primeiro!
            </p>
          )}
        </section>
      </article>
    </FeedLayout>
  )
}
