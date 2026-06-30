'use client'

import { FileBarChart, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useDesktopAutoCycle } from '@/lib/use-desktop-auto-cycle'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import { aiTabIcons, type AiTab } from '@/lib/i18n-types'

type ReportDemoData = {
  tag: string
  user: string
  ai: string
  previewLabel: string
  metricLabels: string[]
  anomalyNote: string
}

type ChartDemoData = {
  tag: string
  user: string
  ai: string
  beforeLabel: string
  afterLabel: string
}

type CleanDemoData = {
  tag: string
  cleanButton: string
  completeLabel: string
  results: string[]
}

type LayoutDemoData = {
  tag: string
  beforeLabel: string
  afterLabel: string
  optimizeButton: string
  afterNote: string
}

export function AiCapabilities() {
  const t = useTranslations('aiCapabilities')
  const rawTabs = t.raw('tabs') as { id: string; label: string }[]
  const tabs: AiTab[] = rawTabs.map((tab) => ({
    ...tab,
    icon: aiTabIcons[tab.id],
  }))

  const { index, select, pauseProps } = useDesktopAutoCycle(tabs.length)
  const active = tabs[index].id

  return (
    <section id="ai" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <Reveal className="mt-12">
          <div {...pauseProps}>
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab, i) => {
                const on = active === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => select(i)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                      on
                        ? 'border-cyan/50 bg-cyan/10 text-cyan'
                        : 'border-border text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card p-4 backdrop-blur-xl sm:p-6">
              {active === 'report' && (
                <ReportDemo data={t.raw('demos.report') as ReportDemoData} />
              )}
              {active === 'chart' && (
                <ChartDemo data={t.raw('demos.chart') as ChartDemoData} />
              )}
              {active === 'clean' && (
                <CleanDemo data={t.raw('demos.clean') as CleanDemoData} />
              )}
              {active === 'layout' && (
                <LayoutDemo data={t.raw('demos.layout') as LayoutDemoData} />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DemoShell({
  left,
  right,
  tag,
}: {
  left: React.ReactNode
  right: React.ReactNode
  tag: string
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {left}
        {right}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{tag}</p>
    </div>
  )
}

function ChatPanel({
  user,
  ai,
}: {
  user: string
  ai: React.ReactNode
}) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-background/50 p-4">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-violet/15 px-4 py-2.5 text-sm text-slate-200">
        {user}
      </div>
      <div className="flex items-start gap-2">
        <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cyan/15 text-cyan">
          <FileBarChart className="h-3.5 w-3.5" />
        </span>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm text-slate-300">
          {ai}
        </div>
      </div>
    </div>
  )
}

function ReportDemo({ data }: { data: ReportDemoData }) {
  return (
    <DemoShell
      tag={data.tag}
      left={
        <ChatPanel
          user={data.user}
          ai={
            <span>
              {data.ai.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
              <span className="animate-blink">▍</span>
            </span>
          }
        />
      }
      right={
        <div className="rounded-xl border border-border bg-background/50 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            {data.previewLabel}
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {data.metricLabels.map((k) => (
              <div key={k} className="rounded-lg bg-secondary p-2 text-center">
                <p className="text-[10px] text-muted-foreground">{k}</p>
                <p className="font-mono text-xs font-semibold text-foreground">
                  ↑12%
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {[60, 80, 45, 90, 70, 30].map((h, i) => (
              <span
                key={i}
                className={cn(
                  'flex-1 rounded-sm',
                  i === 5 ? 'bg-amber' : 'bg-gradient-to-t from-violet to-cyan',
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-amber/30 bg-amber/10 p-2.5 text-xs text-amber/90">
            {data.anomalyNote}
          </div>
        </div>
      }
    />
  )
}

function ChartDemo({ data }: { data: ChartDemoData }) {
  return (
    <DemoShell
      tag={data.tag}
      left={
        <ChatPanel
          user={data.user}
          ai={
            <span>
              {data.ai}
              <span className="animate-blink">▍</span>
            </span>
          }
        />
      }
      right={
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-dashed border-border bg-background/40 p-4">
            <p className="text-xs text-muted-foreground">{data.beforeLabel}</p>
            <div className="mt-6 space-y-2">
              <div className="h-2 w-3/4 rounded bg-secondary" />
              <div className="h-2 w-1/2 rounded bg-secondary" />
              <div className="h-2 w-2/3 rounded bg-secondary" />
            </div>
          </div>
          <div className="rounded-xl border border-cyan/30 bg-background/40 p-4">
            <p className="text-xs text-cyan">{data.afterLabel}</p>
            <svg viewBox="0 0 100 60" className="mt-3 h-20 w-full">
              <polyline
                points="0,45 20,30 40,35 60,18 80,22 100,8"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
              />
              <polyline
                points="0,52 20,48 40,40 60,42 80,30 100,28"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="33"
                x2="100"
                y2="33"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>
      }
    />
  )
}

function CleanDemo({ data }: { data: CleanDemoData }) {
  const rows = [
    { date: '2024-07-01', region: '华东', sales: '¥128,400', state: 'ok' },
    { date: '07/02/2024', region: '华南', sales: '—', state: 'missing' },
    { date: '2024-07-03', region: '华北', sales: '¥9,999,999', state: 'outlier' },
    { date: '2024.07.04', region: '西南', sales: '¥86,200', state: 'format' },
  ]
  const stateColor: Record<string, string> = {
    ok: 'text-slate-300',
    missing: 'bg-danger/15 text-danger',
    outlier: 'bg-amber/15 text-amber',
    format: 'bg-amber/10 text-amber/80',
  }
  return (
    <DemoShell
      tag={data.tag}
      left={
        <div className="rounded-xl border border-border bg-background/50 p-4">
          <div className="space-y-1.5 font-mono text-xs">
            {rows.map((r) => (
              <div
                key={r.date}
                className="grid grid-cols-3 gap-2 rounded-md px-2 py-1.5"
              >
                <span className={cn('rounded px-1', stateColor[r.state])}>
                  {r.date}
                </span>
                <span className="text-slate-400">{r.region}</span>
                <span className={cn('rounded px-1', stateColor[r.state])}>
                  {r.sales}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-violet to-cyan py-2 text-sm font-semibold text-white">
            {data.cleanButton}
          </button>
        </div>
      }
      right={
        <div className="rounded-xl border border-emerald/30 bg-background/50 p-4">
          <p className="text-xs font-medium text-emerald">{data.completeLabel}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {data.results.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 flex-none text-emerald" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  )
}

function LayoutDemo({ data }: { data: LayoutDemoData }) {
  return (
    <DemoShell
      tag={data.tag}
      left={
        <div className="rounded-xl border border-dashed border-border bg-background/40 p-4">
          <p className="text-xs text-muted-foreground">{data.beforeLabel}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="col-span-2 h-10 rounded bg-secondary" />
            <div className="h-16 rounded bg-secondary" />
            <div className="h-12 rounded bg-secondary" />
            <div className="col-span-2 h-8 rounded bg-secondary" />
          </div>
          <button className="mt-4 w-full rounded-lg border border-border py-2 text-sm font-semibold text-foreground">
            {data.optimizeButton}
          </button>
        </div>
      }
      right={
        <div className="rounded-xl border border-violet/30 bg-background/40 p-4">
          <p className="text-xs text-violet">{data.afterLabel}</p>
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded bg-secondary" />
              ))}
            </div>
            <div className="h-16 rounded bg-gradient-to-r from-violet/30 to-cyan/30" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded bg-secondary" />
              <div className="h-10 rounded bg-secondary" />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{data.afterNote}</p>
        </div>
      }
    />
  )
}
