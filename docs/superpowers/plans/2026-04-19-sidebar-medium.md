# Sidebar Medium-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the sidebar to match Medium's visual style and add a hamburger toggle in the Topbar that animates the sidebar between expanded (260px) and icon-only (64px) modes.

**Architecture:** A new `SidebarContext` provides `isCollapsed` state (persisted in `localStorage`) to both `Topbar` and `SidebarNav`. `LayoutWrapper` wraps everything with the Provider and animates `margin-left` as the sidebar width changes. All transitions use 250ms ease-in-out CSS.

**Tech Stack:** Next.js, React Context API, Tailwind CSS v3 (JIT), inline SVG icons (no new dependencies)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `components/SidebarContext.js` | **CREATE** | Context + Provider + localStorage persistence |
| `components/LayoutWrapper.js` | **MODIFY** | Wrap with Provider, animate content margin-left |
| `components/Topbar.js` | **MODIFY** | Add hamburger button (lg+ only) before logo |
| `components/SidebarNav.js` | **MODIFY** | Medium style, 6 items, animate width + label fade |

---

## Task 1: Create SidebarContext

**Files:**
- Create: `components/SidebarContext.js`

- [ ] **Step 1: Create the context file**

Create `components/SidebarContext.js` with this exact content:

```jsx
import { createContext, useContext, useState, useEffect } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored !== null) setIsCollapsed(stored === 'true')
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('sidebar-collapsed', String(next))
      return next
    })
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SidebarContext.js
git commit -m "feat: add SidebarContext with localStorage persistence"
```

---

## Task 2: Update LayoutWrapper

**Files:**
- Modify: `components/LayoutWrapper.js`

- [ ] **Step 1: Replace LayoutWrapper content**

Replace the entire contents of `components/LayoutWrapper.js` with:

```jsx
import Footer from './Footer'
import Topbar from './Topbar'
import SidebarNav from './SidebarNav'
import { SidebarProvider, useSidebar } from './SidebarContext'

function LayoutInner({ children }) {
  const { isCollapsed } = useSidebar()

  return (
    <>
      <Topbar />
      <SidebarNav />
      <div
        className="min-h-screen pt-16 transition-[margin-left] duration-[250ms] ease-in-out"
        style={{ marginLeft: isCollapsed ? '64px' : '260px' }}
      >
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}

const LayoutWrapper = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  )
}

export default LayoutWrapper
```

Note: `marginLeft` via inline style handles the responsive animation cleanly. The `transition-[margin-left]` Tailwind class enables the CSS transition.

- [ ] **Step 2: Start dev server and verify page loads without errors**

```bash
npm run dev
```

Open http://localhost:3000. Expected: page renders normally (sidebar still 260px, no console errors about missing context).

- [ ] **Step 3: Commit**

```bash
git add components/LayoutWrapper.js
git commit -m "feat: wrap layout with SidebarProvider, animate margin-left"
```

---

## Task 3: Add Hamburger to Topbar

**Files:**
- Modify: `components/Topbar.js`

- [ ] **Step 1: Replace Topbar content**

Replace the entire contents of `components/Topbar.js` with:

```jsx
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'
import { useSidebar } from './SidebarContext'

export default function Topbar() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-stroke bg-white dark:border-[#292929] dark:bg-[#111111]">
      <div className="flex h-full items-center justify-between px-6">

        {/* Left: Hamburger + Logo + Search */}
        <div className="flex items-center gap-4">
          <button
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
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink dark:bg-wash-subtle">
            <span className="font-sans text-xs font-bold text-white dark:text-ink">G</span>
          </div>
        </div>

      </div>
    </header>
  )
}
```

- [ ] **Step 2: Verify in browser**

With `npm run dev` still running, open http://localhost:3000. Expected:
- Hamburger (3 lines) appears to the left of "Gnios" in the header on desktop
- Button is invisible on mobile/tablet (below lg breakpoint)
- Clicking hamburger does nothing visible yet (SidebarNav hasn't been updated)
- No console errors

- [ ] **Step 3: Commit**

```bash
git add components/Topbar.js
git commit -m "feat: add hamburger toggle button to Topbar"
```

---

## Task 4: Redesign SidebarNav (Medium style + collapse animation)

**Files:**
- Modify: `components/SidebarNav.js`

- [ ] **Step 1: Replace SidebarNav content**

Replace the entire contents of `components/SidebarNav.js` with:

```jsx
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
              <Link
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`mx-2 flex items-center gap-3 rounded-md py-[9px] text-[14px] transition-colors ${
                  isCollapsed ? 'justify-center px-2' : 'px-[14px]'
                } ${
                  isActive
                    ? 'font-semibold text-[#191919] dark:text-[#fafafa]'
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
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Verify expanded state in browser**

With `npm run dev`, open http://localhost:3000 on a desktop-width window. Expected:
- Sidebar shows 6 items: Home, Blog, Snippets, Projetos, Sobre, Contato
- No left border on active item — just bold text + full-opacity icon
- Inactive items: gray text + 50% opacity icon
- Hovering an item shows a rounded background highlight
- Font is 14px, system sans-serif

- [ ] **Step 3: Verify collapsed state in browser**

Click the hamburger button in the topbar. Expected:
- Sidebar smoothly animates from 260px → 64px
- Text labels fade out during the animation
- Icons stay visible, centered in the narrow sidebar
- Hovering an icon shows the native browser tooltip with the item name
- Main content area shifts left smoothly (margin-left animates from 260px → 64px)
- Clicking the hamburger again expands back to 260px

- [ ] **Step 4: Verify localStorage persistence**

With the sidebar collapsed, refresh the page. Expected:
- Page loads with the sidebar already collapsed (no flash from expanded to collapsed)

- [ ] **Step 5: Verify dark mode**

Toggle dark mode using the ThemeSwitch button. Expected:
- Sidebar background: `#111111`
- Active item text: `#fafafa`
- Inactive items: `#888`, hover background `#252525`
- Hamburger lines: `#888`

- [ ] **Step 6: Verify mobile**

Resize browser to below 1024px width. Expected:
- Sidebar is hidden (unchanged behavior)
- Hamburger button is not visible in the topbar
- Mobile nav still works as before

- [ ] **Step 7: Commit**

```bash
git add components/SidebarNav.js
git commit -m "feat: redesign sidebar Medium-style with collapse animation"
```

---

## Task 5: Final verification and cleanup

- [ ] **Step 1: Build and check for errors**

```bash
npm run build
```

Expected: build completes without errors or warnings about missing classes.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no new lint errors.

- [ ] **Step 3: Verify all pages render correctly**

With `npm run dev`, visit each linked page and check the sidebar renders correctly on each:
- http://localhost:3000 (Home)
- http://localhost:3000/blog (Blog)
- http://localhost:3000/snippets (Snippets)
- http://localhost:3000/projects (Projetos)
- http://localhost:3000/resume (Sobre)
- http://localhost:3000/contact (Contato)

Expected on each page: correct nav item is active (bold, full-opacity icon), sidebar shows correctly in both expanded and collapsed states.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify build and lint pass for sidebar redesign"
```
