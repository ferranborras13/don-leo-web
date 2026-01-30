import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { Link } from '@/i18n/routing'
import { Mail } from "lucide-react"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'company' })

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
          <Mail className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-bold text-text">
            {t('contactTitle')}
          </h1>
        </div>

        <p className="text-lg text-muted mb-12">
          {t('contactText')}
        </p>

        <div className="space-y-8 text-text">
          <section className="bg-surface border border-cardBorder rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('emailTitle')}
            </h2>
            <p className="text-muted mb-4">
              {t('emailLabel')}:
            </p>
            <a
              href="mailto:support@donleo.app"
              className="text-accent hover:text-accentPressed transition-colors font-medium"
            >
              support@donleo.app
            </a>
            <p className="text-body-sm text-muted mt-2">
              {t('responseTime')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('supportHoursTitle')}
            </h2>
            <p className="text-muted">
              {t('supportHoursText')}
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
