import { useState } from 'react'
import Link from './Link'
import { useRouter } from 'next/router'
import { navItems } from '@/data/navItems'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const router = useRouter()

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
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-[250ms] ease-in-out dark:bg-[#111111] ${
          navShow ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
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

        {/* Nav — same style as SidebarNav */}
        <ul className="mt-5 flex flex-col">
          {navItems.map((item) => {
            const isActive =
              router.pathname === item.href ||
              (item.href !== '/' && router.pathname.startsWith(item.href))

            return (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <a
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onToggleNav}
                    className={`mx-2 flex items-center gap-3 rounded-md px-[14px] py-[9px] text-[14px] transition-colors ${
                      isActive
                        ? 'font-semibold text-[#191919] hover:bg-wash dark:text-[#fafafa] dark:hover:bg-[#252525]'
                        : 'font-normal text-[#6b6b6b] hover:bg-wash hover:text-[#333] dark:text-[#888] dark:hover:bg-[#252525] dark:hover:text-[#fafafa]'
                    }`}
                  >
                    <span className={`shrink-0 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MobileNav
