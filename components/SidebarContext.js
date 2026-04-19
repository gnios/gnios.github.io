import { createContext, useContext, useState, useEffect } from 'react'

const SidebarContext = createContext(null)

const STORAGE_KEY = 'sidebar-collapsed'

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) setIsCollapsed(stored === 'true')
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, String(next))
      }
      return next
    })
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed: mounted ? isCollapsed : false, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}
