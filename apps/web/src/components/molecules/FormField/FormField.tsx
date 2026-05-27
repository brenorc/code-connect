import { Label } from '../../atoms/Label/Label'

interface FormFieldProps {
  id: string
  label: string
  children: React.ReactNode
}

export function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}
