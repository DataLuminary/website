import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/routing'

/** Dev: `/` has no `[locale]` segment; static export uses postbuild-static.mjs for production `/`. */
export default function RootPage() {
  redirect(`/${defaultLocale}/`)
}
