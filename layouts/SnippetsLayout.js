import Link from '@/components/Link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

export default function SnippetsLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const filteredPosts = posts.filter((fm) => {
    const content = fm.title + (fm.summary || '') + (fm.tags || []).join(' ')
    return content.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts

  return (
    <div className="px-8 py-10">
      {title && (
        <div className="mb-10 space-y-5">
          <h1 className="font-serif text-[32px] font-bold text-ink dark:text-wash-subtle">
            {title}
          </h1>
          <div className="flex max-w-sm items-center gap-2 rounded-full bg-wash px-4 py-2.5 dark:bg-[#1A1A1A]">
            <svg
              className="h-4 w-4 shrink-0 text-ink-faint"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              aria-label="Buscar snippets"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar snippets..."
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint dark:text-wash-subtle"
            />
          </div>
        </div>
      )}

      <ul>
        {!filteredPosts.length && (
          <p className="py-10 font-sans text-ink-light dark:text-ink-faint">
            Nenhum snippet encontrado.
          </p>
        )}

        {displayPosts.map((fm) => {
          const { slug, date, title: postTitle, summary, tags } = fm

          return (
            <li
              key={slug}
              className="cursor-pointer border-b border-stroke py-6 last:border-b-0 dark:border-[#292929]"
              onClick={() => router.push(`/snippets/${slug}`)}
            >
              <div className="space-y-1.5">
                <p className="font-sans text-[12px] font-semibold uppercase tracking-wide text-ink-light dark:text-ink-faint">
                  Gnios &middot; <time dateTime={date}>{formatDate(date)}</time>
                </p>
                <h2 className="font-serif text-[20px] font-bold leading-snug text-ink dark:text-wash-subtle">
                  <Link href={`/snippets/${slug}`} className="hover:underline">
                    {postTitle}
                  </Link>
                </h2>
                {summary && (
                  <p className="line-clamp-2 font-serif text-[15px] leading-relaxed text-ink-light dark:text-ink-faint">
                    {summary}
                  </p>
                )}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-wash px-2.5 py-0.5 font-sans text-[11px] text-ink-light dark:bg-[#292929] dark:text-ink-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
