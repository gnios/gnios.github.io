import Link from './Link'
import { useRouter } from 'next/router'
import { useSidebar } from './SidebarContext'
import { navItems } from '@/data/navItems'

export default function SidebarNav() {
  const router = useRouter()
  const { isCollapsed } = useSidebar()

  return (
    <nav
      className={`fixed left-0 top-16 z-40 hidden overflow-hidden bg-white transition-[width] duration-[250ms] ease-in-out dark:bg-[#111111] lg:block ${
        isCollapsed ? 'w-16' : 'w-56'
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
