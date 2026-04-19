import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'

export default function Topbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-stroke bg-white dark:border-[#292929] dark:bg-[#111111]">
      <div className="flex h-full items-center justify-between px-6">

        {/* Left: Logo + Search */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-[-0.3px] text-ink dark:text-wash-subtle"
            aria-label={siteMetadata.headerTitle}
          >
            {siteMetadata.author || 'Gnios'}
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-wash px-4 py-2 dark:bg-[#1A1A1A] sm:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-ink-faint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm text-ink-faint">Buscar artigos...</span>
          </div>
        </div>

        {/* Right: Theme + Bell + Avatar */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <button
            className="rounded-full p-2 text-ink-light hover:bg-wash dark:text-ink-faint dark:hover:bg-[#292929]"
            aria-label="Notificações"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          {/* Avatar: dark bg + white initial in light mode; light bg + dark initial in dark mode */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink dark:bg-wash-subtle">
            <span className="font-sans text-xs font-bold text-white dark:text-ink">G</span>
          </div>
        </div>

      </div>
    </header>
  )
}
