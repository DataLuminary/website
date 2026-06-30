'use client'

import {
  ArrowRight,
  Star,
  Check,
  Sparkles,
  Puzzle,
  Lock,
  Database,
  LayoutGrid,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Reveal } from './reveal'
import {
  heroStatusColors,
  heroStatusIcons,
  heroTrustIcons,
  heroValueColors,
} from '@/lib/i18n-types'

export function Hero() {
  const t = useTranslations('hero')
  const values = t.raw('values') as string[]
  const trust = t.raw('trust') as { label: string }[]
  const statusChips = t.raw('card.statusChips') as { label: string }[]

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-96 w-96 rounded-full bg-cyan/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-xs font-medium text-violet shadow-[0_0_20px_-6px] shadow-violet/50">
              <Sparkles className="h-3.5 w-3.5" />
              {t('badge')}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-balance">
              <span className="text-gradient">{t('title')}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-lg text-slate-300 sm:text-xl">
              {t('tagline')}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-8 space-y-3">
              {values.map((text, i) => (
                <li key={text} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-secondary ${heroValueColors[i]}`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-pretty text-sm text-slate-300 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-transform hover:-translate-y-1"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/DataLuminary"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Star className="h-4 w-4 text-amber" />
                {t('github')}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trust.map((item, i) => {
                const Icon = heroTrustIcons[i]
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                )
              })}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200} className="relative">
            <HeroCard
              statusChips={statusChips}
              aiGenerating={t('card.aiGenerating')}
              totalSales={t('card.totalSales')}
              anomalyTrend={t('card.anomalyTrend')}
              anomalyCount={t('card.anomalyCount')}
              anomalyAlert={t('card.anomalyAlert')}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HeroCard({
  statusChips,
  aiGenerating,
  totalSales,
  anomalyTrend,
  anomalyCount,
  anomalyAlert,
}: {
  statusChips: { label: string }[]
  aiGenerating: string
  totalSales: string
  anomalyTrend: string
  anomalyCount: string
  anomalyAlert: string
}) {
  return (
    <div className="relative w-full ">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-violet/20 to-cyan/20 blur-3xl" />

      <div className="glass animate-float overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber/80" />
          <span className="h-3 w-3 rounded-full bg-emerald/80" />
          <div className="ml-3 flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            app.dataluminary.dev/dashboard
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 rounded-lg border border-violet/30 bg-violet/10 px-3 py-2">
            <Sparkles className="h-4 w-4 flex-none text-cyan" />
            <span className="text-sm text-slate-200">
              {aiGenerating}
              <span className="animate-blink">▍</span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <MiniBars />
            <MiniLine />
            <MiniDonut />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-background/40 p-3">
              <p className="text-xs text-muted-foreground">{totalSales}</p>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                ¥4.82M
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/40 p-3">
              <p className="text-xs text-muted-foreground">{anomalyTrend}</p>
              <p className="mt-1 font-mono text-lg font-semibold text-amber">
                {anomalyCount}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber/30 bg-amber/10 p-3">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-amber" />
            <p className="text-xs text-amber/90">{anomalyAlert}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            {statusChips.map((c, i) => {
              const Icon = heroStatusIcons[i]
              return (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                >
                  <Icon className={`h-3 w-3 ${heroStatusColors[i]}`} />
                  {c.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniBars() {
  const heights = [40, 70, 55, 90, 65]
  return (
    <div className="flex h-20 items-end justify-between gap-1 rounded-lg border border-border bg-background/40 p-2">
      {heights.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-violet to-cyan"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

function MiniLine() {
  return (
    <div className="h-20 rounded-lg border border-border bg-background/40 p-2">
      <svg viewBox="0 0 80 50" className="h-full w-full" preserveAspectRatio="none">
        <polyline
          points="0,40 16,28 32,32 48,14 64,20 80,6"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function MiniDonut() {
  return (
    <div className="flex h-20 items-center justify-center rounded-lg border border-border bg-background/40 p-2">
      <svg viewBox="0 0 36 36" className="h-14 w-14">
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="rgba(148,163,184,0.2)"
          strokeWidth="5"
        />
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="#10b981"
          strokeWidth="5"
          strokeDasharray="62 88"
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      </svg>
    </div>
  )
}
