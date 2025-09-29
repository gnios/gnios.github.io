import { useEffect, useState } from 'react'
import CommandPalette from './CommandPalette'

const ClientOnlyCommandPalette = ({ navigation }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <CommandPalette navigation={navigation} />
}

export default ClientOnlyCommandPalette
