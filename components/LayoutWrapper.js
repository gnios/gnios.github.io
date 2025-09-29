import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { navigation } from '@/data/nav'
import ClientOnlyCommandPalette from './ClientOnlyCommandPalette'
import ThemeSwitch from './ThemeSwitch'
import ClientOnlyTypewriter from './ClientOnlyTypewriter'
import ClientOnlyRouter from './ClientOnlyRouter'
import DropMenu from './DropMenu.js'
import NoSSR from './NoSSR'
// import Logo from '@/data/logo.svg'
// import MobileNav from './MobileNav'

const LayoutWrapper = ({ children }) => {

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              {/* <div className="flex items-center justify-between">
                <div className="mr-1">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div> */}
              <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-semibold">
                <NoSSR fallback={<span>~/</span>}>
                  <ClientOnlyRouter>
                    {(path) => (
                      <>
                        {path}{' '}
                        <ClientOnlyTypewriter
                          options={{
                            strings: [],
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </>
                    )}
                  </ClientOnlyRouter>
                </NoSSR>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="link-underline rounded px-2 py-1 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:px-3 sm:py-2"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <NoSSR>
              <ClientOnlyCommandPalette navigation={navigation} />
            </NoSSR>
            <NoSSR>
              <ThemeSwitch />
            </NoSSR>
            <NoSSR>
              <DropMenu />
            </NoSSR>
            {/* <MobileNav /> */}
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
