'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

export function Terminal() {
  const t = useTranslations('terminal')
  const lines = [
    { text: '$ git clone github.com/LuminaryWorks/DataLuminary-Platform', c: 'text-slate-200' },
    { text: '$ cd DataLuminary-Platform', c: 'text-slate-200' },
    { text: '', c: '' },
    { text: `$ bash init.sh          ${t('initComment')}`, c: 'text-slate-200' },
    { text: `$ pnpm bootstrap        ${t('bootstrapComment')}`, c: 'text-slate-200' },
    { text: '', c: '' },
    { text: `$ pnpm dev:talk         ${t('backendComment')}`, c: 'text-cyan' },
    { text: `$ pnpm dev:view         ${t('frontendComment')}`, c: 'text-cyan' },
    { text: '', c: '' },
    { text: t('done'), c: 'text-emerald' },
    { text: t('defaultAccount'), c: 'text-muted-foreground' },
  ]

  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || count >= lines.length) return
    const timer = setTimeout(() => setCount((c) => c + 1), 280)
    return () => clearTimeout(timer)
  }, [started, count, lines.length])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-[#0b1120] font-mono shadow-2xl"
    >
      <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-danger/80" />
        <span className="h-3 w-3 rounded-full bg-amber/80" />
        <span className="h-3 w-3 rounded-full bg-emerald/80" />
        <span className="ml-3 text-xs text-muted-foreground">
          {t('title')}
        </span>
      </div>
      <div className="min-h-[280px] space-y-1 p-4 text-xs leading-relaxed sm:text-sm">
        {lines.slice(0, count).map((l, i) => (
          <p key={i} className={l.c || 'text-slate-200'}>
            {l.text || '\u00A0'}
          </p>
        ))}
        {started && count < lines.length && (
          <span className="inline-block h-4 w-2 animate-blink bg-cyan align-middle" />
        )}
      </div>
    </div>
  )
}
