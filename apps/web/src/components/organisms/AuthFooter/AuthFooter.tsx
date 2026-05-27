import { TextLink } from '../../atoms/TextLink/TextLink'

interface AuthFooterProps {
  promptText: string
  linkLabel: string
  linkHref: string
  trailingIcon?: string
}

export function AuthFooter({ promptText, linkLabel, linkHref, trailingIcon }: AuthFooterProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <p className="text-text-muted text-sm">{promptText}</p>
      <TextLink href={linkHref}>
        {linkLabel}
        {trailingIcon && <span className="ml-1">{trailingIcon}</span>}
      </TextLink>
    </div>
  )
}
