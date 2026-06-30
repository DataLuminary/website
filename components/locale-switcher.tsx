'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  localeLabels,
  locales,
  type Locale,
} from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next })
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-label={t('toggleLang')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="max-w-[5rem] truncate text-xs">
          {localeLabels[locale]}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('toggleLang')}
          className="absolute right-0 top-full z-50 mt-2 max-h-72 w-44 overflow-y-auto rounded-xl border border-border bg-popover py-1 shadow-xl backdrop-blur-xl"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchLocale(l)}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-secondary',
                  l === locale
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                <span>{localeLabels[l]}</span>
                {l === locale && (
                  <Check className="h-3.5 w-3.5 flex-none text-cyan" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
