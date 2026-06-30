'use client'

import { GitBranch, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Logo } from './logo'

type EcoKey = 'blockyedu' | 'syncrobrain' | 'vistacast' | 'vistaremote'

type EcoProduct = {
  key: EcoKey
  name: string
  logo: string
  site: { label: string; href: string }
  github?: string
}

const products: EcoProduct[] = [
  {
    key: 'blockyedu',
    name: 'BlockyEdu',
    logo: '/ecosystem/blockyedu.png',
    site: { label: 'blockyedu.com', href: 'https://blockyedu.com' },
    github: 'https://github.com/blockyedu',
  },
  {
    key: 'syncrobrain',
    name: 'SyncroBrain',
    logo: '/ecosystem/syncrobrain.png',
    site: { label: 'syncrobrain.com', href: 'https://syncrobrain.com' },
    github: 'https://github.com/syncrobrain',
  },
  {
    key: 'vistacast',
    name: 'VistaCast',
    logo: '/ecosystem/vistacast.svg',
    site: { label: 'vistacast.dev', href: 'https://vistacast.dev' },
  },
  {
    key: 'vistaremote',
    name: 'VistaRemote',
    logo: '/ecosystem/vistaremote.svg',
    site: { label: 'remote.vistacast.dev', href: 'https://remote.vistacast.dev' },
    github: 'https://github.com/VistaRemote',
  },
]

const LUMINARYWORKS_SITE = 'https://luminaryworks.dev'
const LUMINARYWORKS_GITHUB = 'https://github.com/luminaryWorks'
const DATALUMINARY_GITHUB = 'https://github.com/dataluminary'

export function SiteFooter() {
  const t = useTranslations('siteFooter')
  const itemDescriptions = t.raw('ecosystem.items') as Record<EcoKey, string>

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t('tagline')}
            </p>
            {/*<a
              href={LUMINARYWORKS_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              {t('poweredBy')}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <div className="mt-5 flex gap-3">
              <a
                href={DATALUMINARY_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DataLuminary on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                <GitBranch className="h-4 w-4" />
              </a>
            </div>*/}
            <div style={{ textAlign: 'right',marginTop: '10px' }}>
              <a
                href={LUMINARYWORKS_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                {t('poweredBy')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {t('ecosystem.subtitle')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.key}
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 backdrop-blur-xl transition-colors hover:border-cyan/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.logo}
                      alt={product.name}
                      width={28}
                      height={28}
                      loading="lazy"
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {itemDescriptions[product.key]}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a
                        href={product.site.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-cyan"
                      >
                        <ArrowUpRight className="h-3 w-3" />
                        {product.site.label}
                      </a>
                      {product.github && (
                        <a
                          href={product.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${product.name} on GitHub`}
                          className="inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-cyan"
                        >
                          <GitBranch className="h-3 w-3" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">{t('copyright')}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href={LUMINARYWORKS_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cyan"
            >
              luminaryworks.dev
            </a>
            <a
              href={LUMINARYWORKS_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-cyan"
            >
              <GitBranch className="h-3.5 w-3.5" />
              LuminaryWorks
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
