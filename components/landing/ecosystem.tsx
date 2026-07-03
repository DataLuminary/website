'use client'

import {
  BarChart3,
  Network,
  GraduationCap,
  Radio,
  Coins,
  Monitor,
  Video,
  ShoppingCart,
  Gamepad2,
  Landmark,
  Factory,
  Store,
  HeartPulse,
  BookOpen,
  Truck,
  ClipboardList,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const industryIcons = [
  ShoppingCart,
  Gamepad2,
  Landmark,
  Factory,
  Store,
  HeartPulse,
  BookOpen,
  Truck,
  ClipboardList,
] as const

const nodeIcons = [Radio, GraduationCap, Video, Monitor, Coins] as const
const nodeAccents = ['text-emerald', 'text-amber', 'text-rose', 'text-cyan', 'text-violet'] as const

const valueIcons = [BarChart3, Network, GraduationCap] as const

type Industry = { label: string }
type EcosystemNode = {
  name: string
  role: string
  desc: string
  scenario: string
  href?: string
  badge?: string
}
type ValueCard = { title: string; body: string }

export function Ecosystem() {
  const t = useTranslations('ecosystem')
  const industries = t.raw('industries') as Industry[]
  const nodes = t.raw('nodes') as EcosystemNode[]
  const valueCards = t.raw('valueCards') as ValueCard[]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <Reveal className="mt-14">
          <p className="text-center text-sm font-medium text-slate-300">
            {t('industriesTitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => {
              const Icon = industryIcons[i]
              return (
                <span
                  key={ind.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-slate-300 backdrop-blur-xl"
                >
                  <Icon className="h-4 w-4 text-cyan" />
                  {ind.label}
                </span>
              )
            })}
          </div>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm text-muted-foreground">
            {t('industriesNote')}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="flex items-center justify-center">
            <div className="relative">
              <div className="mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-center shadow-[0_0_50px_-6px] shadow-violet/50">
                <span className="font-heading text-base font-bold text-white">
                  DataLuminary
                </span>
                <span className="mt-0.5 text-xs text-white/85">{t('hubTag')}</span>
                <span className="mt-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white">
                  {t('hubBadge')}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {nodes.map((n, i) => {
                const Icon = nodeIcons[i]
                return (
                  <div
                    key={n.name}
                    className="rounded-xl border border-border bg-card p-4 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-secondary', nodeAccents[i])}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={cn('text-xs font-bold', nodeAccents[i])}>{n.role}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {n.href ? (
                        <a
                          href={n.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-cyan"
                        >
                          {n.name}
                        </a>
                      ) : (
                        n.name
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                    <p className="mt-2 text-[11px] text-slate-400">→ {n.scenario}</p>
                    {n.badge && (
                      <span className="mt-2 inline-block rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-medium text-amber">
                        {n.badge}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {valueCards.map((c, i) => {
            const Icon = valueIcons[i]
            return (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 backdrop-blur-xl">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">{t('footerNote')}</p>
        </Reveal>
      </div>
    </section>
  )
}
