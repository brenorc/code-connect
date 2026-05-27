interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  trailingIcon?: React.ReactNode
  onClick?: () => void
  children: React.ReactNode
}

export function Button({
  type = 'button',
  loading = false,
  disabled = false,
  trailingIcon,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-accent text-accent-fg font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:brightness-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? 'Carregando...' : children}
      {!loading && trailingIcon}
    </button>
  )
}
