import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { Link } from '@/i18n/routing'
import { Shield } from "lucide-react"

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'legal' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-cardBorder">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 max-w-6xl mx-auto">
          <Link href="/">
            <DonLeoLogo size="md" priority />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-12 md:py-16 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-bold text-text">
            {t('privacyTitle')}
          </h1>
        </div>

        <p className="text-lg text-muted mb-8">
          {t('privacyIntro')}
        </p>

        <div className="space-y-6 text-text">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('infoCollectionTitle')}
            </h2>
            <ul className="space-y-2 text-muted">
              {[1,2,3,4,5].map((i) => (
                <li key={i}>• {t(`privacyBullets${i}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('dataUsageTitle')}
            </h2>
            <p className="text-muted">
              {t('dataUsageText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('yourRightsTitle')}
            </h2>
            <p className="text-muted">
              {t('yourRightsText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('contactTitle')}
            </h2>
            <p className="text-muted">
              {t('contactText')}
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <PrimaryCTA size="default">{tCommon('contactUs')}</PrimaryCTA>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
