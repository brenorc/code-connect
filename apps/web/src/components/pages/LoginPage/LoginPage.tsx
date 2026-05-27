import { Divider } from '../../atoms/Divider/Divider'
import { SocialLoginRow } from '../../molecules/SocialLoginRow/SocialLoginRow'
import { AuthFooter } from '../../organisms/AuthFooter/AuthFooter'
import { LoginForm } from '../../organisms/LoginForm/LoginForm'
import { AuthLayout } from '../../templates/AuthLayout/AuthLayout'

const SOCIAL_PROVIDERS = [
  { id: 'github', label: 'Github', iconSrc: '/Github.png' },
  { id: 'gmail', label: 'Gmail', iconSrc: '/Gmail.png' },
]

export function LoginPage() {
  function handleSubmit(values: { emailOrUsername: string; password: string; rememberMe: boolean }) {
    console.log('Login submit:', values)
  }

  return (
    <AuthLayout bannerSrc="/Banner.png" bannerAlt="Pessoa programando com telas ao redor">
      <header>
        <h1 className="text-text-strong text-3xl font-semibold tracking-tight">Login</h1>
        <p className="text-text mt-2 text-base">Boas-vindas! Faça seu login.</p>
      </header>

      <LoginForm onSubmit={handleSubmit} />

      <Divider label="ou entre com outras contas" />

      <SocialLoginRow providers={SOCIAL_PROVIDERS} />

      <AuthFooter
        promptText="Ainda não tem conta?"
        linkLabel="Crie seu cadastro!"
        linkHref="#"
        trailingIcon="📋"
      />
    </AuthLayout>
  )
}
