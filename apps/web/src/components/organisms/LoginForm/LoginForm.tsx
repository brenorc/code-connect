import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Input } from '../../atoms/Input/Input'
import { TextLink } from '../../atoms/TextLink/TextLink'
import { FormField } from '../../molecules/FormField/FormField'

interface LoginFormValues {
  emailOrUsername: string
  password: string
  rememberMe: boolean
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  isSubmitting?: boolean
  errorMessage?: string
}

export function LoginForm({ onSubmit, isSubmitting = false, errorMessage }: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({
    emailOrUsername: '',
    password: '',
    rememberMe: false,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <FormField id="emailOrUsername" label="Email ou usuário">
        <Input
          id="emailOrUsername"
          name="emailOrUsername"
          type="text"
          value={values.emailOrUsername}
          onChange={(e) => setValues((v) => ({ ...v, emailOrUsername: e.target.value }))}
          placeholder="usuario123"
          autoComplete="username"
        />
      </FormField>

      <FormField id="password" label="Senha">
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          placeholder="••••••"
          autoComplete="current-password"
        />
      </FormField>

      <div className="flex items-center justify-between">
        <Checkbox
          id="rememberMe"
          name="rememberMe"
          checked={values.rememberMe}
          onChange={(e) => setValues((v) => ({ ...v, rememberMe: e.target.checked }))}
          label="Lembrar-me"
        />
        <TextLink href="#">Esqueci a senha</TextLink>
      </div>

      {errorMessage && (
        <p role="alert" className="text-red-400 text-sm">
          {errorMessage}
        </p>
      )}

      <Button type="submit" loading={isSubmitting}>
        Login →
      </Button>
    </form>
  )
}
