interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  if (!label) {
    return <hr className="border-border" />
  }

  return (
    <div className="flex items-center gap-3 text-text-muted text-sm">
      <span className="flex-1 border-t border-border" />
      {label}
      <span className="flex-1 border-t border-border" />
    </div>
  )
}
