import { useEffect, useState } from 'react'
import GAScript from './GoogleAnalytics'

const ClientOnlyGoogleAnalytics = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <GAScript />
}

export default ClientOnlyGoogleAnalytics
