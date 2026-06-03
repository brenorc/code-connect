import { useState } from 'react'
import { api, isAxiosError } from '../../../services/api'
import { Divider } from '../../atoms/Divider/Divider'
import { SocialLoginRow } from '../../molecules/SocialLoginRow/SocialLoginRow'
import { AuthFooter } from '../../organisms/AuthFooter/AuthFooter'
import { SignupForm } from '../../organisms/SignupForm/SignupForm'
import { AuthLayout } from '../../templates/AuthLayout/AuthLayout'

const SOCIAL_PROVIDERS = [
  { id: 'github', label: 'Github', iconSrc: '/Github.png' },
  { id: 'gmail', label: 'Gmail', iconSrc: '/Gmail.png' },
]

export function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(values: {
    name: string
    email: string
    password: string
    rememberMe: boolean
  }) {
    setIsSubmitting(true)
    setError('')
    try {
      await api.register({ name: values.name, email: values.email, password: values.password })
      window.location.hash = '#/'
    } catch (err) {
      setError(
        isAxiosError(err) && err.response?.status === 409
          ? 'Este email já está cadastrado.'
          : 'Erro inesperado. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout bannerSrc="/Banner.png" bannerAlt="Pessoa programando com telas ao redor">
      <header>
        <h1 className="text-text-strong text-3xl font-semibold tracking-tight">Cadastro</h1>
        <p className="text-text mt-2 text-base">Olá! Preencha seus dados.</p>
      </header>

      <SignupForm onSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={error} />

      <Divider label="ou entre com outras contas" />

      <SocialLoginRow providers={SOCIAL_PROVIDERS} />

      <AuthFooter
        promptText="Já tem conta?"
        linkLabel="Faça seu login!"
        linkHref="#/"
        trailingIcon="🔑"
      />
    </AuthLayout>
  )
}
