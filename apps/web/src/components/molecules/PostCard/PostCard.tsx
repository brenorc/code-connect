import type { PostResponse } from '../../../services/api'
import { PostThumbnailPlaceholder } from '../../atoms/PostThumbnailPlaceholder/PostThumbnailPlaceholder'

interface PostCardProps {
  post: PostResponse
  isLoggedIn: boolean
  onLike?: () => void
  onComment?: () => void
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
  return (
    <div
      className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-fg text-xs font-semibold shrink-0"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

interface ActionIconProps {
  icon: string
  count: number
  label: string
  onClick?: () => void
  disabled?: boolean
}

function ActionIcon({ icon, count, label, onClick, disabled }: ActionIconProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      disabled={disabled}
      aria-label={label}
      className={`flex flex-col items-center gap-0.5 text-text-muted transition-colors ${
        disabled ? 'cursor-not-allowed opacity-60' : 'hover:text-accent cursor-pointer'
      }`}
    >
      <span className="material-icons" style={{ fontSize: '20px' }}>{icon}</span>
      <span className="text-xs">{count}</span>
    </button>
  )
}

export function PostCard({ post, isLoggedIn, onLike, onComment }: PostCardProps) {
  return (
    <article className="flex flex-col rounded-lg overflow-hidden w-full">
      {post.thumbnailUrl ? (
        <div className="h-[240px] bg-surface overflow-hidden rounded-t-lg">
          <img
            src={post.thumbnailUrl}
            alt={`Thumbnail do post: ${post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <PostThumbnailPlaceholder />
      )}

      <div className="bg-surface rounded-b-lg p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-text-strong font-semibold text-base leading-snug line-clamp-2">
            {post.title}
          </h2>
          <p className="text-text text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-border text-text-muted text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <ActionIcon
              icon="code"
              count={post.likesCount}
              label="Curtir post"
              onClick={onLike}
              disabled={!isLoggedIn}
            />
            <ActionIcon
              icon="share"
              count={0}
              label="Compartilhar post"
              disabled={!isLoggedIn}
            />
            <ActionIcon
              icon="chat"
              count={post.commentsCount}
              label="Comentar post"
              onClick={onComment}
              disabled={!isLoggedIn}
            />
          </div>

          <div className="flex items-center gap-2">
            <Avatar name={post.author.name} />
            <span className="text-text-muted text-sm font-semibold">
              @{post.author.name.split(' ')[0].toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
