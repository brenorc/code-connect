interface SocialButtonProps {
  iconSrc: string
  iconAlt: string
  label: string
  href?: string
  onClick?: () => void
}

export function SocialButton({ iconSrc, iconAlt, label, href, onClick }: SocialButtonProps) {
  const className =
    'flex flex-col items-center gap-1.5 bg-surface border border-border rounded-xl px-6 py-3 text-text text-sm hover:border-accent/40 transition-colors cursor-pointer'

  if (href) {
    return (
      <a href={href} className={className}>
        <img src={iconSrc} alt={iconAlt} className="w-7 h-7 object-contain" />
        {label}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <img src={iconSrc} alt={iconAlt} className="w-7 h-7 object-contain" />
      {label}
    </button>
  )
}
