import { defaultLocale, locales, type Locale } from '@/i18n/routing'

export const SITE_URL = 'https://dataluminary.dev'
export const SITE_NAME = 'DataLuminary'
export const DOCS_URL = 'https://docs.dataluminary.dev'
export const APP_URL = 'https://app.dataluminary.dev'
export const GITHUB_URL = 'https://github.com/DataLuminary'
export const OG_IMAGE_PATH = '/og-image.png'

/** Open Graph locale tags (underscore form). */
export const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  es: 'es_ES',
  pt: 'pt_BR',
  nl: 'nl_NL',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
}

/** Absolute URL for a locale home (default zh-CN is apex `/`). */
export function localeHomePath(locale: Locale): string {
  if (locale === defaultLocale) return '/'
  return `/${locale}/`
}

export function localeHomeUrl(locale: Locale): string {
  const path = localeHomePath(locale)
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function hreflangLanguages(): Record<string, string> {
  const languages: Record<string, string> = {
    'x-default': `${SITE_URL}/`,
  }
  for (const locale of locales) {
    languages[locale] = localeHomeUrl(locale)
  }
  return languages
}
