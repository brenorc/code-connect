interface InputProps {
  id: string
  name: string
  type?: 'text' | 'password' | 'email'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
}

export function Input({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full bg-input-bg text-text-strong rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-text-muted"
    />
  )
}
