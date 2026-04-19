import { useRef } from 'react'
import { useRouter } from 'next/router'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'
import { useSidebar } from './SidebarContext'

export default function Topbar() {
  const { toggleSidebar } = useSidebar()
  const router = useRouter()
  const inputRef = useRef(null)

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim()
      const base = router.pathname.startsWith('/snippets') ? '/snippets' : '/blog'
      router.push(q ? `${base}?q=${encodeURIComponent(q)}` : base)
      inputRef.current?.blur()
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-stroke bg-white dark:border-[#292929] dark:bg-[#111111]">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Hamburger (desktop) / MobileNav (mobile) + Logo + Search */}
        <div className="flex items-center gap-4">
          <MobileNav />
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden h-8 w-8 flex-col items-center justify-center gap-[4px] rounded hover:bg-wash dark:hover:bg-[#292929] lg:flex"
            aria-label="Toggle sidebar"
          >
            <span className="block h-[1.5px] w-4 rounded bg-ink-light dark:bg-[#888]" />
            <span className="block h-[1.5px] w-4 rounded bg-ink-light dark:bg-[#888]" />
            <span className="block h-[1.5px] w-4 rounded bg-ink-light dark:bg-[#888]" />
          </button>

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
              className="h-4 w-4 shrink-0 text-ink-faint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar artigos..."
              onKeyDown={handleSearch}
              className="w-40 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint dark:text-wash-subtle"
            />
          </div>
        </div>

        {/* Right: Theme + Bell + Avatar */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <button
            className="hidden rounded-full p-2 text-ink-light hover:bg-wash dark:text-ink-faint dark:hover:bg-[#292929]"
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
        </div>
      </div>
    </header>
  )
}
