import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { localeHomeUrl, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const localeHomes = locales.map((locale) => ({
    url: localeHomeUrl(locale),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: locale === 'zh-CN' || locale === 'en' ? 1 : 0.8,
  }))

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...localeHomes.filter((e) => e.url !== `${SITE_URL}/`),
  ]
}
