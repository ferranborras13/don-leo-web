import { redirect } from 'next/navigation'

/**
 * Locale-aware dashboard redirect page
 * Redirects /{locale}/dashboard to /{locale}/app
 */
export default async function LocaleDashboardRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/app`)
}
