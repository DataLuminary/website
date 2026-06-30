'use client'

import {
  BarChart3,
  Factory,
  Landmark,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const caseIcons = [
  BarChart3,
  Factory,
  Landmark,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
] as const

const caseAccents = [
  'text-cyan',
  'text-emerald',
  'text-amber',
  'text-violet',
  'text-cyan',
  'text-violet',
] as const

type UseCase = { title: string; desc: string; persona: string }

export function UseCases() {
  const t = useTranslations('useCases')
  const cases = t.raw('cases') as UseCase[]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => {
            const Icon = caseIcons[i]
            return (
              <Reveal key={c.title} delay={(i % 3) * 80}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan/40">
                  <div className="flex items-center justify-between">
                    <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-secondary', caseAccents[i])}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {c.persona}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
