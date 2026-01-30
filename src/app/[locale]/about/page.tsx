import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { Link } from '@/i18n/routing'
import { Heart } from "lucide-react"

export default async function AboutPage({
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
          <Heart className="h-8 w-8 text-accent" />
          <h1 className="text-4xl font-bold text-text">
            {t('aboutTitle')}
          </h1>
        </div>

        <p className="text-lg text-muted mb-12">
          {t('aboutText')}
        </p>

        <div className="space-y-8 text-text">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('missionTitle')}
            </h2>
            <p className="text-muted">
              {t('missionText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('storyTitle')}
            </h2>
            <p className="text-muted">
              {t('storyText')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-text">
              {t('teamTitle')}
            </h2>
            <p className="text-muted">
              {t('teamText')}
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
