import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing, type Locale } from '@/i18n/routing'
import {
  APP_URL,
  DOCS_URL,
  GITHUB_URL,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  hreflangLanguages,
  localeHomeUrl,
  ogLocaleMap,
} from '@/lib/seo'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})
const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
})
const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const title = t('title')
  const description = t('description')
  const ogTitle = t('openGraph.title')
  const ogDescription = t('openGraph.description')
  const canonical = localeHomeUrl(locale)
  const ogLocale = ogLocaleMap[locale] ?? 'zh_CN'
  const alternateLocales = Object.values(ogLocaleMap).filter((l) => l !== ogLocale)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s · ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: 'LuminaryWorks', url: 'https://luminaryworks.dev' }],
    creator: 'LuminaryWorks',
    publisher: 'LuminaryWorks',
    category: 'technology',
    keywords: t.raw('keywords') as string[],
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
    alternates: {
      canonical,
      languages: hreflangLanguages(),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: alternateLocales,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE_PATH],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0f1e',
}

function JsonLd({ locale }: { locale: Locale }) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [GITHUB_URL, 'https://luminaryworks.dev'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: locale,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${DOCS_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: SITE_NAME,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Docker, Linux, macOS, Windows',
        url: SITE_URL,
        downloadUrl: GITHUB_URL,
        softwareHelp: DOCS_URL,
        installUrl: APP_URL,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        license: 'https://opensource.org/licenses/MIT',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale: localeParam } = await params

  if (!hasLocale(routing.locales, localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <JsonLd locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
