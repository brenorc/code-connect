interface AuthLayoutProps {
  bannerSrc: string
  bannerAlt: string
  children: React.ReactNode
}

export function AuthLayout({ bannerSrc, bannerAlt, children }: AuthLayoutProps) {
  return (
    <div className="min-h-svh bg-bg flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 bg-surface rounded-2xl p-6 max-w-4xl w-full">
        <aside className="hidden md:block">
          <img
            src={bannerSrc}
            alt={bannerAlt}
            className="rounded-xl h-full object-cover max-h-[600px]"
          />
        </aside>
        <main className="flex flex-col gap-6 py-4 px-2">{children}</main>
      </div>
    </div>
  )
}
