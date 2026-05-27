interface CheckboxProps {
  id: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export function Checkbox({ id, name, checked, onChange, label }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none text-text text-sm">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-accent cursor-pointer"
      />
      {label}
    </label>
  )
}
