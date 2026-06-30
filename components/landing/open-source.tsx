'use client'

import { useState } from 'react'
import {
  Database,
  BarChart3,
  LayoutGrid,
  Package,
  FunctionSquare,
  Zap,
  Server,
  Star,
  BookOpen,
  MessageSquare,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

const layerIcons = [Database, BarChart3, LayoutGrid] as const
const layerAccents = ['text-emerald', 'text-cyan', 'text-violet'] as const

const featureIcons = [Package, FunctionSquare, Zap, Server] as const

const communityIcons = [BookOpen, MessageSquare, HeartHandshake] as const

const codeSamples: Record<string, string> = {
  import: `// 通过 Lerna 管理的独立包，按需引入
// 不必部署完整平台，单独使用任意能力

import { createDataset, queryDataset }
  from '@dataluminary/dataset'        // 数据集引擎

import { renderChart }
  from '@dataluminary/chart-antv'     // 图表渲染

import { GridPanel }
  from '@dataluminary/panel-grid'     // 布局引擎`,
  serverless: `// 函数式数据处理 — 可直接部署为 Serverless 函数
// 数据清洗、聚合、转换，无状态纯函数

export const handler = async (event) => {
  const raw   = await fetchSource(event.datasetId)
  const clean = pipe(
    filterNulls,        // 过滤空值
    normalizeFields,    // 字段标准化
    aggregateByDim,     // 按维度聚合
  )(raw)
  return renderChart('bar', clean)
}`,
  compose: `// 业务逻辑同样函数式组合
// 可在 Edge / Serverless / Node 任意环境运行

const salesReport = compose(
  addAIInsights,        // AI 洞察注入
  buildChartConfigs,    // 图表配置生成
  joinDatasets,         // 数据集关联
  applyUserFilters,     // 用户筛选器
)`,
}

type Layer = {
  headline: string
  sub: string
  points: string[]
  cta: string
}

type CodeTab = { id: string; label: string }

type FeatureCard = { title: string; body: string }

type CommunityItem = { title: string; body: string }

export function OpenSource() {
  const t = useTranslations('openSource')
  const layers = t.raw('layers') as Layer[]
  const codeTabs = t.raw('codeTabs') as CodeTab[]
  const featureCards = t.raw('featureCards') as FeatureCard[]
  const community = t.raw('community') as CommunityItem[]

  const [tab, setTab] = useState(codeTabs[0]?.id ?? 'import')
  const currentCode = codeSamples[tab] ?? codeSamples.import

  return (
    <section id="open-source" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {layers.map((l, i) => {
            const Icon = layerIcons[i]
            return (
              <Reveal key={l.headline} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 backdrop-blur-xl">
                  <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-secondary', layerAccents[i])}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {l.headline}
                  </h3>
                  <p className={cn('mt-1 text-sm font-medium', layerAccents[i])}>{l.sub}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {l.points.map((p) => (
                      <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                        <span className={cn('mt-1.5 h-1 w-1 flex-none rounded-full bg-current', layerAccents[i])} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://github.com"
                    className={cn('mt-5 inline-flex items-center gap-1.5 text-sm font-medium', layerAccents[i])}
                  >
                    {l.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border bg-[#0b1120]">
              <div className="flex flex-wrap gap-1 border-b border-border p-2">
                {codeTabs.map((codeTab) => (
                  <button
                    key={codeTab.id}
                    type="button"
                    onClick={() => setTab(codeTab.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                      tab === codeTab.id
                        ? 'bg-secondary text-cyan'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {codeTab.label}
                  </button>
                ))}
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300">
                <code>{currentCode}</code>
              </pre>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featureCards.map((c, i) => {
                const Icon = featureIcons[i]
                return (
                  <div
                    key={c.title}
                    className="rounded-xl border border-border bg-card p-4 backdrop-blur-xl"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-foreground">{c.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/DataLuminary"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Star className="h-4 w-4 text-amber" />
              {t('starGithub')}
            </a>
            <span className="rounded-full border border-emerald/40 bg-emerald/10 px-3 py-1.5 text-xs font-medium text-emerald">
              {t('commercialBadge')}
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {community.map((c, i) => {
            const Icon = communityIcons[i]
            return (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 text-center backdrop-blur-xl">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-semibold text-foreground">{c.title}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-pretty italic text-slate-300">
            {t('quote')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
