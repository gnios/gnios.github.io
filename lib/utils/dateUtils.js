export const currentDayName = () => {
  const date = new Date()
  // Use pt-BR locale to match the site's language
  return date.toLocaleString('pt-BR', { weekday: 'long' })
}
