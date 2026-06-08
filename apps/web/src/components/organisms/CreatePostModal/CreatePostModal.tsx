import { useState } from 'react'
import { api, isAxiosError } from '../../../services/api'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '../../atoms/Button/Button'

const inputClass =
  'w-full bg-input-bg text-text-strong text-sm rounded-lg py-3 px-4 placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent'

interface CreatePostModalProps {
  onClose: () => void
  onCreated: () => void
}

export function CreatePostModal({ onClose, onCreated }: CreatePostModalProps) {
  const { token } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function addTag() {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed])
    }
    setTagInput('')
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setIsSubmitting(true)
    setError('')
    try {
      await api.createPost(
        {
          title,
          description,
          thumbnailUrl: thumbnailUrl || undefined,
          tags,
        },
        token,
      )
      onCreated()
      onClose()
    } catch (err) {
      setError(
        isAxiosError(err) ? 'Erro ao criar post. Verifique os campos.' : 'Erro inesperado.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-surface rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 id="modal-title" className="text-text-strong text-xl font-semibold">
            Nova publicação
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
            aria-label="Fechar modal"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-text text-sm font-medium" htmlFor="post-title">
              Título *
            </label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Como usar React Hooks"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text text-sm font-medium" htmlFor="post-description">
              Descrição *
            </label>
            <textarea
              id="post-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o conteúdo do seu post..."
              required
              rows={4}
              className="bg-input-bg text-text-strong text-sm rounded-lg py-3 px-4 placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text text-sm font-medium" htmlFor="post-thumbnail">
              URL da thumbnail (opcional)
            </label>
            <input
              id="post-thumbnail"
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://example.com/imagem.png"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-text text-sm font-medium" htmlFor="post-tags">
              Tags (pressione Enter para adicionar)
            </label>
            <div className="flex gap-2">
              <input
                id="post-tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Ex: React"
                className="flex-1 bg-input-bg text-text-strong text-sm rounded-lg py-3 px-4 placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 border border-border text-text-muted rounded-lg hover:border-accent hover:text-accent transition-colors text-sm"
              >
                Adicionar
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-border text-text-muted text-xs px-2 py-1 rounded"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      aria-label={`Remover tag ${tag}`}
                      className="hover:text-text transition-colors"
                    >
                      <span className="material-icons" style={{ fontSize: '14px' }}>close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-text-muted border border-border rounded-lg hover:border-text-muted transition-colors text-sm"
            >
              Cancelar
            </button>
            <Button type="submit" loading={isSubmitting}>
              Publicar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
