import Footer from './Footer'
import Topbar from './Topbar'
import SidebarNav from './SidebarNav'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Topbar />
      <SidebarNav />
      <div className="min-h-screen pt-16 lg:ml-[240px]">
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default LayoutWrapper
