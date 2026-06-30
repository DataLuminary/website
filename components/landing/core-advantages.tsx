'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import {
  advantageAccents,
  advantageIcons,
  type AdvantageCard,
} from '@/lib/i18n-types'

type Accent = 'cyan' | 'violet' | 'emerald' | 'amber'

const accentMap: Record<
  Accent,
  { text: string; ring: string; glow: string; bg: string }
> = {
  cyan: {
    text: 'text-cyan',
    ring: 'hover:border-cyan/50',
    glow: 'group-hover:shadow-cyan/20',
    bg: 'bg-cyan/10',
  },
  violet: {
    text: 'text-violet',
    ring: 'hover:border-violet/50',
    glow: 'group-hover:shadow-violet/20',
    bg: 'bg-violet/10',
  },
  emerald: {
    text: 'text-emerald',
    ring: 'hover:border-emerald/50',
    glow: 'group-hover:shadow-emerald/20',
    bg: 'bg-emerald/10',
  },
  amber: {
    text: 'text-amber',
    ring: 'hover:border-amber/50',
    glow: 'group-hover:shadow-amber/20',
    bg: 'bg-amber/10',
  },
}

function allExpanded(count: number): Set<number> {
  return new Set(Array.from({ length: count }, (_, i) => i))
}

export function CoreAdvantages() {
  const t = useTranslations('coreAdvantages')
  const rawCards = t.raw('cards') as Omit<AdvantageCard, 'icon' | 'accent'>[]
  const cards: AdvantageCard[] = rawCards.map((card, i) => ({
    ...card,
    icon: advantageIcons[i],
    accent: advantageAccents[i],
  }))

  const [expanded, setExpanded] = useState<Set<number>>(() =>
    allExpanded(cards.length),
  )

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section id="advantages" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          {cards.map((card, i) => {
            const a = accentMap[card.accent]
            const isOpen = expanded.has(i)
            return (
              <Reveal
                key={card.headline}
                delay={(i % 2) * 80}
                as="article"
                className="w-full"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={cn(
                    'group flex w-full flex-col rounded-2xl border border-border bg-card p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
                    a.ring,
                    a.glow,
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl',
                        a.bg,
                        a.text,
                      )}
                    >
                      <card.icon className="h-6 w-6" />
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 text-muted-foreground transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                    {card.headline}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>

                  <div
                    className={cn(
                      'grid transition-all duration-300',
                      isOpen
                        ? 'mt-5 grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-2.5 border-t border-border pt-5">
                        {card.chips.map((chip) => (
                          <li
                            key={chip.label}
                            className="flex flex-col gap-0.5 rounded-lg bg-secondary/60 p-3"
                          >
                            <span
                              className={cn('text-sm font-semibold', a.text)}
                            >
                              {chip.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {chip.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
