interface TextLinkProps {
  href: string
  children: React.ReactNode
  variant?: 'accent' | 'muted'
}

export function TextLink({ href, children, variant = 'accent' }: TextLinkProps) {
  return (
    <a
      href={href}
      className={
        variant === 'accent'
          ? 'text-accent text-sm font-medium hover:brightness-110 transition-all'
          : 'text-text-muted text-sm hover:text-text transition-colors'
      }
    >
      {children}
    </a>
  )
}
