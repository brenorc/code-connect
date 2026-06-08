interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Digite o que você procura' }: SearchBarProps) {
  return (
    <div className="flex items-center gap-4 bg-surface rounded-lg px-4 py-3 w-full">
      <span className="material-icons text-text-muted" style={{ fontSize: '28px' }}>
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-text text-sm placeholder:text-text-muted outline-none"
        aria-label="Buscar posts"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-text-muted hover:text-text transition-colors"
          aria-label="Limpar busca"
        >
          <span className="material-icons" style={{ fontSize: '18px' }}>close</span>
        </button>
      )}
    </div>
  )
}
