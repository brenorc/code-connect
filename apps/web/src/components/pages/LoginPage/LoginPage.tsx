import { useState } from 'react'
import { api, isAxiosError } from '../../../services/api'
import { useAuth } from '../../../contexts/AuthContext'
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
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(values: {
    emailOrUsername: string
    password: string
    rememberMe: boolean
  }) {
    setIsSubmitting(true)
    setError('')
    try {
      const { access_token } = await api.login({
        email: values.emailOrUsername,
        password: values.password,
      })
      const user = await api.getMe(access_token)
      login(access_token, user)
      window.location.hash = '#/feed'
    } catch (err) {
      setError(
        isAxiosError(err) && err.response?.status === 401
          ? 'Email ou senha inválidos.'
          : 'Erro inesperado. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout bannerSrc="/Banner.png" bannerAlt="Pessoa programando com telas ao redor">
      <header>
        <h1 className="text-text-strong text-3xl font-semibold tracking-tight">Login</h1>
        <p className="text-text mt-2 text-base">Boas-vindas! Faça seu login.</p>
      </header>

      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={error} />

      <Divider label="ou entre com outras contas" />

      <SocialLoginRow providers={SOCIAL_PROVIDERS} />

      <AuthFooter
        promptText="Ainda não tem conta?"
        linkLabel="Crie seu cadastro!"
        linkHref="#/cadastro"
        trailingIcon="📋"
      />
    </AuthLayout>
  )
}
