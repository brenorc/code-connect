import { SocialButton } from '../SocialButton/SocialButton'

interface Provider {
  id: string
  label: string
  iconSrc: string
  href?: string
}

interface SocialLoginRowProps {
  providers: Provider[]
}

export function SocialLoginRow({ providers }: SocialLoginRowProps) {
  return (
    <div className="flex justify-center gap-4">
      {providers.map((provider) => (
        <SocialButton
          key={provider.id}
          iconSrc={provider.iconSrc}
          iconAlt={provider.label}
          label={provider.label}
          href={provider.href}
        />
      ))}
    </div>
  )
}
