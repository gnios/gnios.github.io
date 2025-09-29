import CVLayout from '@/components/CVLayout'

export default function AuthorLayout({ children, frontMatter }) {
  return <CVLayout frontMatter={frontMatter}>{children}</CVLayout>
}
