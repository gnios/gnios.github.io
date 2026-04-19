import { useState } from 'react'
import Link from './Link'

const navLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Artigos' },
  { href: '/snippets', title: 'Snippets' },
  { href: '/resume', title: 'Sobre' },
]

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      document.body.style.overflow = status ? 'auto' : 'hidden'
      return !status
    })
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-8 w-8 flex-col items-center justify-center gap-[4px] rounded hover:bg-wash dark:hover:bg-[#292929]"
        aria-label="Abrir menu"
        onClick={onToggleNav}
      >
        <span className="block h-[1.5px] w-4 rounded bg-ink-light dark:bg-[#888]" />
        <span className="block h-[1.5px] w-4 rounded bg-ink-light dark:bg-[#888]" />
        <span className="block h-[1.5px] w-4 rounded bg-ink-light dark:bg-[#888]" />
      </button>

      <div
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out dark:bg-[#111111] ${
          navShow ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-stroke px-6 dark:border-[#292929]">
          <span className="text-xl font-extrabold tracking-[-0.3px] text-ink dark:text-wash-subtle">
            Gnios
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-wash dark:hover:bg-[#292929]"
            aria-label="Fechar menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-ink-light dark:text-[#888]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center px-6 py-4 text-[17px] font-medium text-ink-light hover:text-ink dark:text-[#888] dark:hover:text-[#fafafa]"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
