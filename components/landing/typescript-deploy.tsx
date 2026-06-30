'use client'

import { Sparkles, Users, ShieldCheck, Rocket, X, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import { Terminal } from './terminal'

const reasonIcons = [Sparkles, Users, ShieldCheck, Rocket] as const

type Reason = { title: string; body: string }

export function TypeScriptDeploy() {
  const t = useTranslations('typescriptDeploy')
  const reasons = t.raw('reasons') as Reason[]
  const compareBad = t.raw('compareBad') as string[]

  return (
    <section id="deploy" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <Terminal />
          </Reveal>

          <Reveal delay={100}>
            <h3 className="font-heading text-xl font-bold text-foreground">
              {t('whyTitle')}
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reasons.map((r, i) => {
                const Icon = reasonIcons[i]
                return (
                  <div
                    key={r.title}
                    className="rounded-xl border border-border bg-card p-4 backdrop-blur-xl"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {r.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 rounded-xl border border-amber/30 bg-amber/5 p-4">
              <p className="text-sm font-semibold text-amber">{t('compareTitle')}</p>
              <ul className="mt-2 space-y-1.5">
                {compareBad.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <X className="h-3.5 w-3.5 flex-none text-danger" />
                    {item}
                  </li>
                ))}
                <li className="flex items-center gap-2 pt-1 text-xs text-emerald">
                  <Check className="h-3.5 w-3.5 flex-none" />
                  {t('compareGood')}
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
