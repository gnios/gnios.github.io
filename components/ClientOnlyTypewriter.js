import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

const ClientOnlyTypewriter = ({ options }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Typewriter options={options} />
}

export default ClientOnlyTypewriter
