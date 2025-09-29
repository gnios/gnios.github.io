import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import translatePath from './PathTranslator'

const ClientOnlyRouter = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return children('~/início')
  }

  const translatedPath = translatePath(router.asPath)
  return children(`~/${translatedPath}`)
}

export default ClientOnlyRouter
