import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { Link } from '@/i18n/routing'
import { FileText } from "lucide-react"

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'legal' })

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
          <FileText className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-bold text-text">
            {t('termsTitle')}
          </h1>
        </div>

        <p className="text-lg text-muted mb-8">
          {t('termsIntro')}
        </p>

        <div className="space-y-6 text-text">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('acceptanceTitle')}
            </h2>
            <p className="text-muted">
              {t('acceptanceText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('accountTitle')}
            </h2>
            <ul className="space-y-2 text-muted">
              {[1,2,3,4].map((i) => (
                <li key={i}>• {t(`accountBullets${i}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('contentTitle')}
            </h2>
            <ul className="space-y-2 text-muted">
              {[1,2,3,4].map((i) => (
                <li key={i}>• {t(`contentBullets${i}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('paymentTitle')}
            </h2>
            <ul className="space-y-2 text-muted">
              {[1,2,3,4].map((i) => (
                <li key={i}>• {t(`paymentBullets${i}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('terminationTitle')}
            </h2>
            <p className="text-muted">
              {t('terminationText')}
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
