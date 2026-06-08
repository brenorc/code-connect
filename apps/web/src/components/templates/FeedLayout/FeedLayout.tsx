import { Sidebar } from '../../organisms/Sidebar/Sidebar'

interface FeedLayoutProps {
  children: React.ReactNode
  onPublishClick?: () => void
}

export function FeedLayout({ children, onPublishClick }: FeedLayoutProps) {
  return (
    <div className="min-h-svh bg-bg flex gap-6 px-8 py-14">
      <Sidebar onPublishClick={onPublishClick} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
