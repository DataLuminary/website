import { defineRouting } from 'next-intl/routing'

export const locales = [
  'en',
  'zh-CN',
  'zh-TW',
  'es',
  'pt',
  'nl',
  'it',
  'ja',
  'ko',
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-CN'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  es: 'Español',
  pt: 'Português',
  nl: 'Nederlands',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})
