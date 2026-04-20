import Link from '@/components/Link'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { SocialIcon } from 'react-social-icons'
import formatDate from '@/lib/utils/formatDate'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, date, title, images, tags, readingTime, summary } = frontMatter
  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}`
  const featuredImage = images && images.length > 0 ? images[0] : null

  return (
    <>
      <BlogSEO url={postUrl} authorDetails={authorDetails} {...frontMatter} />
      <ScrollTopAndComment />

      <article className="mx-auto max-w-[740px] px-6 py-12">
        {/* ── Header ── */}
        <header className="mb-8">
          <h1 className="font-sans text-[42px] font-bold leading-[52px] tracking-[-0.5px] text-ink dark:text-wash-subtle">
            {title}
          </h1>

          {summary && (
            <p className="mt-4 font-serif text-[22px] leading-[1.45] text-ink-light dark:text-ink-faint">
              {summary}
            </p>
          )}

          {/* Author row */}
          <div className="mt-6 flex items-center gap-3 border-b border-stroke pb-6 dark:border-[#292929]">
            {authorDetails.map((author) =>
              author.avatar ? (
                <Image
                  key={author.name}
                  src={author.avatar}
                  width="36px"
                  height="36px"
                  alt={author.name}
                  className="rounded-full"
                />
              ) : null
            )}
            <div className="font-sans">
              <span className="text-[14px] font-semibold text-ink dark:text-wash-subtle">
                {authorDetails.map((a) => a.name).join(', ')}
              </span>
              <span className="ml-2 text-[12px] text-ink-light dark:text-ink-faint">
                &middot; <time dateTime={date}>{formatDate(date)}</time>
                {readingTime && <> &middot; {readingTime.text}</>}
              </span>
            </div>
          </div>
        </header>

        {/* ── Featured Image ── */}
        {featuredImage && (
          <div className="relative -mx-6 mb-10 aspect-[16/9] overflow-hidden">
            <Image src={featuredImage} alt={title} layout="fill" objectFit="cover" priority />
          </div>
        )}

        {/* ── Body ── */}
        {/* prose (not prose-lg) — Tailwind config sets 21px/1.8 Georgia in DEFAULT */}
        <div className="prose max-w-none dark:prose-dark">{children}</div>

        {/* ── Tags ── */}
        {tags && tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-stroke pt-6 dark:border-[#292929]">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}

        {/* ── Share ── */}
        <div className="mt-8 flex items-center gap-3 border-t border-stroke pt-6 dark:border-[#292929]">
          <span className="font-sans text-[13px] text-ink-light dark:text-ink-faint">
            Compartilhar:
          </span>
          <TwitterShareButton
            url={postUrl}
            title={title}
            via={siteMetadata.socialAccount?.twitter}
            className="flex items-center overflow-hidden rounded-full transition-transform hover:scale-110"
          >
            <SocialIcon
              network="twitter"
              style={{ height: 32, width: 32 }}
              fgColor="#fff"
              bgColor="#1da1f2"
            />
          </TwitterShareButton>
          <LinkedinShareButton
            summary={summary}
            title={title}
            source={siteMetadata.siteUrl}
            url={postUrl}
            className="flex items-center overflow-hidden rounded-full transition-transform hover:scale-110"
          >
            <SocialIcon
              network="linkedin"
              style={{ height: 32, width: 32 }}
              fgColor="#fff"
              bgColor="#0072b1"
            />
          </LinkedinShareButton>
          <WhatsappShareButton
            title={title}
            separator=" : "
            url={postUrl}
            className="flex items-center overflow-hidden rounded-full transition-transform hover:scale-110"
          >
            <SocialIcon
              network="whatsapp"
              style={{ height: 32, width: 32 }}
              fgColor="#fff"
              bgColor="#25D366"
            />
          </WhatsappShareButton>
        </div>

        {/* ── Author Card ── */}
        {authorDetails.map((author) => (
          <div
            key={author.name}
            className="mt-10 flex items-start gap-4 rounded-lg border border-stroke bg-wash-subtle p-5 dark:border-[#292929] dark:bg-[#1A1A1A]"
          >
            {author.avatar && (
              <Image
                src={author.avatar}
                width="52px"
                height="52px"
                alt={author.name}
                className="shrink-0 rounded-full"
              />
            )}
            <div>
              <p className="font-sans text-[15px] font-bold text-ink dark:text-wash-subtle">
                {author.name}
              </p>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-ink-light dark:text-ink-faint">
                {siteMetadata.description}
              </p>
            </div>
          </div>
        ))}

        {/* ── Prev / Next ── */}
        {(next || prev) && (
          <div className="mt-10 grid gap-4 border-t border-stroke pt-8 dark:border-[#292929] sm:grid-cols-2">
            {prev && (
              <div>
                <p className="mb-1 font-sans text-[11px] uppercase tracking-widest text-ink-faint">
                  ← Anterior
                </p>
                <Link
                  href={`/blog/${prev.slug}`}
                  className="font-serif text-[15px] text-ink underline dark:text-wash-subtle"
                >
                  {prev.title}
                </Link>
              </div>
            )}
            {next && (
              <div className="text-right">
                <p className="mb-1 font-sans text-[11px] uppercase tracking-widest text-ink-faint">
                  Próximo →
                </p>
                <Link
                  href={`/blog/${next.slug}`}
                  className="font-serif text-[15px] text-ink underline dark:text-wash-subtle"
                >
                  {next.title}
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/blog"
            className="font-sans text-[13px] text-ink-light underline dark:text-ink-faint"
          >
            ← Voltar para o blog
          </Link>
        </div>
      </article>
    </>
  )
}
