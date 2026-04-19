import Link from './Link'
import { useRouter } from 'next/router'
import { useSidebar } from './SidebarContext'

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Snippets',
    href: '/snippets',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'Projetos',
    href: '/projects',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: 'Sobre',
    href: '/resume',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: 'Contato',
    href: '/contact',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function SidebarNav() {
  const router = useRouter()
  const { isCollapsed } = useSidebar()

  return (
    <nav
      className={`fixed left-0 top-16 z-40 hidden overflow-hidden bg-white transition-[width] duration-[250ms] ease-in-out dark:bg-[#111111] lg:block ${
        isCollapsed ? 'w-16' : 'w-[260px]'
      }`}
      style={{ height: 'calc(100vh - 64px)' }}
    >
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
                  title={isCollapsed ? item.name : undefined}
                  className={`mx-2 flex items-center gap-3 rounded-md py-[9px] text-[14px] transition-colors ${
                    isCollapsed ? 'justify-center px-2' : 'px-[14px]'
                  } ${
                    isActive
                      ? 'font-semibold text-[#191919] hover:bg-wash dark:text-[#fafafa] dark:hover:bg-[#252525]'
                      : 'font-normal text-[#6b6b6b] hover:bg-wash hover:text-[#333] dark:text-[#888] dark:hover:bg-[#252525] dark:hover:text-[#fafafa]'
                  }`}
                >
                  <span
                    className={`shrink-0 transition-opacity duration-[250ms] ${
                      isActive ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-[250ms] ease-in-out ${
                      isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
