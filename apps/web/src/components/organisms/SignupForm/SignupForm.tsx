import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Input } from '../../atoms/Input/Input'
import { FormField } from '../../molecules/FormField/FormField'

interface SignupFormValues {
  name: string
  email: string
  password: string
  rememberMe: boolean
}

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void
  isSubmitting?: boolean
  errorMessage?: string
}

export function SignupForm({ onSubmit, isSubmitting = false, errorMessage }: SignupFormProps) {
  const [values, setValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <FormField id="name" label="Nome">
        <Input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Nome completo"
          autoComplete="name"
        />
      </FormField>

      <FormField id="email" label="Email">
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="Digite seu email"
          autoComplete="email"
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
          autoComplete="new-password"
        />
      </FormField>

      <Checkbox
        id="rememberMe"
        name="rememberMe"
        checked={values.rememberMe}
        onChange={(e) => setValues((v) => ({ ...v, rememberMe: e.target.checked }))}
        label="Lembrar-me"
      />

      {errorMessage && (
        <p role="alert" className="text-red-400 text-sm">
          {errorMessage}
        </p>
      )}

      <Button type="submit" loading={isSubmitting}>
        Cadastrar →
      </Button>
    </form>
  )
}
