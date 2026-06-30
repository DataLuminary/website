'use client'

import { Building2, Shield, Waves, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const teamIcons = [Building2, Waves, Shield, Star] as const
const teamAccents = ['text-cyan', 'text-violet', 'text-amber', 'text-emerald'] as const

type TeamCard = {
  company: string
  role: string
  impact: string
  chips: string[]
}

export function Team() {
  const t = useTranslations('team')
  const cards = t.raw('cards') as TeamCard[]

  return (
    <section id="team" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const Icon = teamIcons[i]
            return (
              <Reveal key={c.company} delay={i * 80} as="article">
                <div className="group h-full rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan/40">
                  <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-secondary', teamAccents[i])}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-base font-bold leading-snug text-foreground">
                    {c.company}
                  </h3>
                  <span className="mt-2 inline-block rounded-full bg-violet/15 px-2.5 py-0.5 text-xs font-medium text-violet">
                    {c.role}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.impact}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-slate-400"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-pretty text-base italic text-slate-300">
            {t('quote')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
