'use client'

import { Check, X, AlertTriangle, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import type { ComparisonCell, ComparisonRow } from '@/lib/i18n-types'

function CellView({ cell }: { cell: ComparisonCell }) {
  const icon = {
    yes: <Check className="h-4 w-4 text-emerald" />,
    no: <X className="h-4 w-4 text-danger" />,
    warn: <AlertTriangle className="h-4 w-4 text-amber" />,
    lock: <Lock className="h-4 w-4 text-muted-foreground" />,
    text: null,
  }[cell.type]

  return (
    <div className="flex items-center gap-2">
      {icon}
      {cell.note && (
        <span className="text-xs text-muted-foreground">{cell.note}</span>
      )}
    </div>
  )
}

export function Comparison() {
  const t = useTranslations('comparison')
  const rows = t.raw('rows') as ComparisonRow[]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
            <thead className="sticky top-16">
              <tr>
                <th className="rounded-tl-xl border-b border-border bg-card px-4 py-4 text-sm font-semibold text-muted-foreground backdrop-blur-xl">
                  {t('colFeature')}
                </th>
                <th className="border-b border-violet/40 bg-violet/10 px-4 py-4 text-sm font-bold text-violet backdrop-blur-xl">
                  {t('colDL')}
                </th>
                <th className="border-b border-border bg-card px-4 py-4 text-sm font-semibold text-slate-300 backdrop-blur-xl">
                  {t('colTrad')}
                </th>
                <th className="rounded-tr-xl border-b border-border bg-card px-4 py-4 text-sm font-semibold text-slate-300 backdrop-blur-xl">
                  {t('colSaas')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? 'bg-secondary/30' : ''}>
                  <td className="border-b border-border px-4 py-3 text-sm font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="border-b border-violet/20 bg-violet/5 px-4 py-3">
                    <CellView cell={row.dl} />
                  </td>
                  <td className="border-b border-border px-4 py-3">
                    <CellView cell={row.trad} />
                  </td>
                  <td className="border-b border-border px-4 py-3">
                    <CellView cell={row.saas} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
