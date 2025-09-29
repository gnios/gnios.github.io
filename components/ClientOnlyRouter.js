import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ClientOnlyRouter = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return children('~/')
  }

  return children(`~${router.asPath}`)
}

export default ClientOnlyRouter
