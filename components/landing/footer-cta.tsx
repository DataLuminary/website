'use client'

import { Rocket, BookOpen, Star, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Reveal } from './reveal'

export function FooterCta() {
  const t = useTranslations('footerCta')

  return (
    <section id="cta" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-violet to-cyan opacity-90" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-extrabold text-balance text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-pretty text-base text-slate-100/90 sm:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/DataLuminary/DataLuminary-Platform"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet transition-transform hover:-translate-y-1"
            >
              <Rocket className="h-4 w-4" />
              {t('deploy')}
            </a>
            <a
              href="https://docs.dataluminary.dev"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <BookOpen className="h-4 w-4" />
              {t('docs')}
            </a>
            <a
              href="https://github.com/DataLuminary"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Star className="h-4 w-4" />
              {t('github')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder={t('emailPlaceholder')}
              aria-label={t('emailAria')}
              className="flex-1 rounded-full border border-white/30 bg-white/15 px-5 py-3 text-sm text-white placeholder:text-white/70 outline-none focus:border-white focus:bg-white/25"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0a0f1e] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t('subscribe')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-100/80">{t('noSpam')}</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90">
            <span>{t('adopted')}</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span>{t('rating')}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
