import LandingPage from "./(root)/page"

/**
 * Locale root page
 * Re-exports the landing page component
 * This ensures /{locale} routes work correctly
 */
export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  // Forward params to the landing page
  return await LandingPage({ params })
}
