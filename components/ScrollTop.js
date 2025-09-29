import { useEffect, useState } from 'react'
import { TbArrowBigUp } from 'react-icons/tb'

const ScrollTop = () => {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div
      className={`fixed bottom-8 right-16 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="pushable"
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          <TbArrowBigUp className="h-5 w-5" />
        </span>
      </button>
    </div>
  )
}

export default ScrollTop
