import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { CoreAdvantages } from '@/components/landing/core-advantages'
import { AiCapabilities } from '@/components/landing/ai-capabilities'
import { PluginArchitecture } from '@/components/landing/plugin-architecture'
import { DataPipeline } from '@/components/landing/data-pipeline'
import { Team } from '@/components/landing/team'
import { TypeScriptDeploy } from '@/components/landing/typescript-deploy'
import { Ecosystem } from '@/components/landing/ecosystem'
import { Comparison } from '@/components/landing/comparison'
import { UseCases } from '@/components/landing/use-cases'
import { OpenSource } from '@/components/landing/open-source'
import { FooterCta } from '@/components/landing/footer-cta'
import { SiteFooter } from '@/components/landing/site-footer'
import { setRequestLocale } from 'next-intl/server'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <CoreAdvantages />
      <AiCapabilities />
      <PluginArchitecture />
      <DataPipeline />
      <Team />
      <TypeScriptDeploy />
      <Ecosystem />
      <Comparison />
      <UseCases />
      <OpenSource />
      <FooterCta />
      <SiteFooter />
    </main>
  )
}
