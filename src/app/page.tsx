import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/request'

/**
 * Root page handler
 * Redirects to the default locale path
 * This is a fallback for when the middleware doesn't catch the root path
 */
export default function RootPage() {
  // Redirect to the default locale
  redirect(`/${defaultLocale}`)
}
