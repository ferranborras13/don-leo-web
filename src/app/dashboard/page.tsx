import { redirect } from 'next/navigation'
import { defaultLocale } from '@/i18n/request'

/**
 * Dashboard redirect page
 * Redirects /dashboard to /{defaultLocale}/app
 */
export default function DashboardRedirect() {
  redirect(`/${defaultLocale}/app`)
}
