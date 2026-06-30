import {
  Sparkles,
  Puzzle,
  MousePointerClick,
  Rocket,
  FileBarChart,
  Palette,
  Brush,
  LayoutGrid,
  Unlock,
  Container,
  Code2,
  ShieldCheck,
  Database,
  LayoutDashboard,
  Layers,
  BarChart3,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ChipItem = { label: string; desc: string }

export type AdvantageCard = {
  icon: LucideIcon
  accent: 'cyan' | 'violet' | 'emerald' | 'amber'
  headline: string
  body: string
  chips: ChipItem[]
}

export type AiTab = {
  id: string
  label: string
  icon: LucideIcon
}

export type OrbitItem = {
  id: string
  icon: LucideIcon
  title: string
  accent: 'violet' | 'cyan' | 'emerald'
  nodes: string[]
  detail: { title?: string; lines: string[] }
}

export type PipelineStep = {
  icon: LucideIcon
  label: string
  en: string
  desc: string
  accent: string
  popup: string[]
}

export type ComparisonCell = {
  type: 'yes' | 'no' | 'warn' | 'lock' | 'text'
  note?: string
}

export type ComparisonRow = {
  feature: string
  dl: ComparisonCell
  trad: ComparisonCell
  saas: ComparisonCell
}

export const advantageIcons = [Sparkles, Puzzle, MousePointerClick, Rocket] as const
export const advantageAccents = ['cyan', 'violet', 'emerald', 'amber'] as const

export const aiTabIcons: Record<string, LucideIcon> = {
  report: FileBarChart,
  chart: Palette,
  clean: Brush,
  layout: LayoutGrid,
}

export const orbitIcons: Record<string, LucideIcon> = {
  panel: LayoutGrid,
  chart: BarChart3,
  datasource: Database,
}

export const orbitAccents: Record<string, 'violet' | 'cyan' | 'emerald'> = {
  panel: 'violet',
  chart: 'cyan',
  datasource: 'emerald',
}

export const pipelineIcons = [Database, Layers, BarChart3, LayoutDashboard] as const
export const pipelineAccents = [
  'text-emerald',
  'text-violet',
  'text-cyan',
  'text-amber',
] as const

export const heroValueColors = ['text-cyan', 'text-violet', 'text-emerald'] as const

export const heroTrustIcons = [Unlock, Container, Code2, ShieldCheck] as const

export const heroStatusIcons = [Database, Sparkles, LayoutGrid, Puzzle] as const
export const heroStatusColors = [
  'text-emerald',
  'text-cyan',
  'text-violet',
  'text-amber',
] as const
