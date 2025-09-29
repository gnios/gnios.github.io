import { useEffect, useState } from 'react'
import ScrollTop from '@/components/ScrollTop'

const ScrollTopAndComment = () => {
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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <ScrollTop />
  }

  return (
    <>
      {/* Botão de like removido para compatibilidade com GitHub Pages */}
      <ScrollTop />
    </>
  )
}

export default ScrollTopAndComment
