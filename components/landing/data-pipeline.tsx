'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import {
  pipelineAccents,
  pipelineIcons,
  type PipelineStep,
} from '@/lib/i18n-types'

export function DataPipeline() {
  const t = useTranslations('dataPipeline')
  const rawSteps = t.raw('steps') as Omit<PipelineStep, 'icon' | 'accent'>[]
  const steps: PipelineStep[] = rawSteps.map((s, i) => ({
    ...s,
    icon: pipelineIcons[i],
    accent: pipelineAccents[i],
  }))

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="relative z-20 mt-16 flex flex-col items-stretch gap-4 overflow-visible pb-4 lg:flex-row lg:items-start lg:pb-0">
          {steps.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className="flex flex-1 items-center gap-4 lg:flex-col"
            >
              <div className="group relative z-10 flex-1 lg:z-auto lg:w-full hover:z-30">
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center backdrop-blur-xl transition-colors hover:border-cyan/40">
                  <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary', s.accent)}>
                    <s.icon className="h-7 w-7" />
                  </span>
                  <p className="mt-4 font-heading text-lg font-bold text-foreground">
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.en}</p>
                  <p className="mt-2 text-sm text-slate-300">{s.desc}</p>
                </div>

                <div className="pointer-events-none absolute left-1/2 z-40 w-64 -translate-x-1/2 rounded-xl border border-border bg-popover p-4 text-left opacity-0 shadow-2xl transition-opacity duration-200 group-hover:opacity-100 max-lg:top-full max-lg:mt-3 lg:bottom-full lg:mb-3 lg:top-auto">
                  <ul className="space-y-1.5">
                    {s.popup.map((p) => (
                      <li key={p} className="text-xs text-slate-300">
                        · {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="flex items-center justify-center lg:w-8">
                  <svg
                    className="h-6 w-6 rotate-90 text-cyan lg:rotate-0"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <line
                      x1="2"
                      y1="12"
                      x2="22"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="animate-dash"
                    />
                    <path
                      d="M16 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="relative z-0 mx-auto mt-16 w-full max-w-2xl rounded-xl border border-violet/30 bg-violet/5 px-4 py-4 text-center sm:max-w-3xl lg:max-w-none lg:px-6">
          <p className="text-sm text-slate-300 lg:whitespace-nowrap">
            <span className="font-semibold text-violet">{t('headlessLabel')}</span>
            {t('headlessNote')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
