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
        className={`min-h-screen pt-16 transition-[margin-left] duration-[250ms] ease-in-out ${
          isCollapsed ? 'lg:ml-16' : 'lg:ml-56'
        }`}
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
