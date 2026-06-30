'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useDesktopAutoCycle } from '@/lib/use-desktop-auto-cycle'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import {
  orbitAccents,
  orbitIcons,
  type OrbitItem,
} from '@/lib/i18n-types'

const accentMap = {
  violet: { text: 'text-violet', border: 'border-violet/50', bg: 'bg-violet/10', ring: 'ring-violet/40' },
  cyan: { text: 'text-cyan', border: 'border-cyan/50', bg: 'bg-cyan/10', ring: 'ring-cyan/40' },
  emerald: { text: 'text-emerald', border: 'border-emerald/50', bg: 'bg-emerald/10', ring: 'ring-emerald/40' },
}

export function PluginArchitecture() {
  const t = useTranslations('pluginArchitecture')
  const rawOrbits = t.raw('orbits') as Omit<OrbitItem, 'icon' | 'accent'>[]
  const orbits: OrbitItem[] = rawOrbits.map((o) => ({
    ...o,
    icon: orbitIcons[o.id],
    accent: orbitAccents[o.id],
  }))

  const { index, select, pauseProps } = useDesktopAutoCycle(orbits.length)
  const active = orbits[index].id
  const current = orbits[index]
  const a = accentMap[current.accent]

  return (
    <section id="plugins" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2" {...pauseProps}>
          <Reveal className="flex justify-center">
            <div className="relative h-[340px] w-[340px] sm:h-[400px] sm:w-[400px]">
              {[1, 2, 3].map((r) => (
                <div
                  key={r}
                  className="absolute inset-0 rounded-full border border-border"
                  style={{
                    inset: `${r * 36}px`,
                    animation: `spin-slow ${40 + r * 20}s linear infinite${r % 2 ? '' : ' reverse'}`,
                  }}
                >
                  <span
                    className={cn(
                      'absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full',
                      r === 1 ? 'bg-violet' : r === 2 ? 'bg-cyan' : 'bg-emerald',
                    )}
                  />
                </div>
              ))}

              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-center shadow-[0_0_40px_-4px] shadow-violet/50">
                <span className="font-heading text-sm font-bold text-white">
                  DataLuminary
                </span>
                <span className="text-xs text-white/80">{t('microkernel')}</span>
              </div>

              {orbits.map((o, i) => {
                const angle = (i / orbits.length) * 2 * Math.PI - Math.PI / 2
                const radius = 150
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                const oa = accentMap[o.accent]
                const on = active === o.id
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => select(i)}
                    className={cn(
                      'absolute left-1/2 top-1/2 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border bg-card text-center backdrop-blur-xl transition-all',
                      on ? cn(oa.border, 'ring-2', oa.ring) : 'border-border',
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    aria-pressed={on}
                  >
                    <o.icon className={cn('h-5 w-5', oa.text)} />
                    <span className="mt-1 px-1 text-[10px] leading-tight text-slate-300">
                      {o.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className={cn('rounded-2xl border bg-card p-6 backdrop-blur-xl', a.border)}>
              <div className="flex items-center gap-3">
                <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl', a.bg, a.text)}>
                  <current.icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {current.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {current.nodes.map((n) => (
                  <span
                    key={n}
                    className={cn('rounded-full border px-3 py-1 text-xs font-mono', a.border, a.text)}
                  >
                    {n}
                  </span>
                ))}
              </div>

              {current.detail.title && (
                <p className={cn('mt-5 text-sm font-semibold', a.text)}>
                  {current.detail.title}
                </p>
              )}
              <ul className="mt-3 space-y-2.5">
                {current.detail.lines.map((line) => (
                  <li key={line} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className={cn('mt-2 h-1.5 w-1.5 flex-none rounded-full', a.bg.replace('/10', ''))} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#open-source"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {t('exploreCta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
