import { useMemo } from 'react'
import frases from '@/data/suassuna'

export default function Footer() {
  const frase = useMemo(() => frases[Math.floor(Math.random() * frases.length)], [])

  return (
    <footer className="mt-16 border-t border-stroke px-8 py-10 dark:border-[#292929]">
      <blockquote className="mb-6 text-center">
        <p className="mx-auto max-w-xl font-serif text-[15px] italic leading-relaxed text-ink-light dark:text-[#888]">
          &ldquo;{frase}&rdquo;
        </p>
        <cite className="mt-2 block font-sans text-[12px] not-italic text-ink-faint dark:text-[#555]">
          — Ariano Suassuna
        </cite>
      </blockquote>

      <p className="text-center font-sans text-[12px] text-ink-faint dark:text-[#555]">
        Gnios © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
