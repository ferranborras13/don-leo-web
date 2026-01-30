import { Link } from '@/i18n/routing'
import { Sparkles, MessageSquare, Shield, Zap, Heart, Apple, Smartphone, Target, Star, Search, Edit, Brain, MessageSquare as MessageIcon } from "lucide-react"
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { PastelTile } from "@/components/ui/pastel-tile"
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { Footer } from "@/components/layout/footer"
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // CRITICAL: Tell next-intl what locale we're using
  setRequestLocale(locale)

  // CRITICAL: Pass locale to getTranslations so it loads the correct language
  const t = await getTranslations({ locale, namespace: 'landing' })

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Navbar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 max-w-6xl mx-auto">
          <DonLeoLogo size="md" priority href="/" locale={locale} />
          <LanguageSwitcher />
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              locale={locale}
              className="text-body-lg text-white hover:text-white/80 transition-colors font-medium"
            >
              {t('header.login')}
            </Link>
            <Link href="/signup" locale={locale}>
              <PrimaryCTA size="default">{t('header.getStarted')}</PrimaryCTA>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-24 md:py-32 relative overflow-hidden">
        {/* Subtle gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accentSoft/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accentSoft/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-3 rounded-full bg-surface border border-cardBorder px-5 py-2 mb-10">
            <span className="text-body-sm text-muted">{t('hero.trustUsers')}</span>
            <span className="text-accent">•</span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-current text-accent" />
              <span className="text-body-sm text-muted">{t('hero.trustRating')}</span>
            </div>
            <span className="text-accent">•</span>
            <span className="text-body-sm text-muted">{t('hero.trustWorks')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-text leading-tight tracking-tight">
            <span className="block">{t('hero.titleLine1')}</span>
            <span className="block">
              <span className="text-muted">{t('hero.titleLine2Start')} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accentCTA">
                {t('hero.titleLine2Highlight')}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Primary CTA */}
          <div className="mb-8">
            <Link href="/signup" locale={locale}>
              <PrimaryCTA size="large">{t('hero.cta')}</PrimaryCTA>
            </Link>
          </div>

          {/* Micro Trust Line */}
          <div className="flex items-center justify-center gap-6 text-body-sm text-muted">
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              <span>{t('hero.encrypted')}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              <span>{t('hero.notStored')}</span>
            </div>
          </div>

          {/* App Store Badges */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-white text-black px-6 py-3 transition-all hover:bg-white/90 hover:scale-105"
            >
              <Apple className="h-8 w-8" />
              <div className="text-left">
                <p className="text-xs opacity-70">{t('hero.appStore')}</p>
                <p className="text-lg font-semibold leading-none">{t('hero.appStoreName')}</p>
              </div>
            </a>
            <button
              disabled
              className="flex items-center gap-3 rounded-2xl border border-cardBorder bg-surface text-muted px-6 py-3 cursor-not-allowed opacity-50"
            >
              <Smartphone className="h-8 w-8" />
              <div className="text-left">
                <p className="text-xs">{t('hero.googlePlay')}</p>
                <p className="text-sm font-medium leading-none">{t('hero.googlePlayName')}</p>
                <p className="text-xs opacity-70">{t('hero.comingSoon')}</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* DonLeo Modes Section */}
      <section className="border-t border-cardBorder bg-surface px-4 md:px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-heading-lg mb-4 text-text">{t('modes.title')}</h2>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">
              {t('modes.subtitle')}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Smooth & Direct */}
            <div className="rounded-3xl neon-card-rose p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-heading-md mb-2">{t('modes.smooth.name')}</h3>
              <p className="text-body-md opacity-70">
                {t('modes.smooth.description')}
              </p>
            </div>

            {/* Funny & Cheesy */}
            <div className="rounded-3xl neon-card-violet p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-heading-md mb-2">{t('modes.funny.name')}</h3>
              <p className="text-body-md opacity-70">
                {t('modes.funny.description')}
              </p>
            </div>

            {/* Short & Punchy */}
            <div className="rounded-3xl neon-card-blue p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-heading-md mb-2">{t('modes.short.name')}</h3>
              <p className="text-body-md opacity-70">
                {t('modes.short.description')}
              </p>
            </div>

            {/* Nerd / Pop Culture */}
            <div className="rounded-3xl neon-card-teal p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-heading-md mb-2">{t('modes.nerd.name')}</h3>
              <p className="text-body-md opacity-70">
                {t('modes.nerd.description')}
              </p>
            </div>

            {/* Savage & Witty */}
            <div className="rounded-3xl neon-card-fuchsia p-6 sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-heading-md mb-2">{t('modes.savage.name')}</h3>
              <p className="text-body-md opacity-70">
                {t('modes.savage.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wingman Section */}
      <section className="px-4 md:px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-heading-lg mb-6 text-text">
                {t('wingman.title')}
              </h2>
              <p className="text-body-lg mb-8 text-muted leading-relaxed">
                {t('wingman.subtitle')}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-cardBorder bg-surface p-5">
                  <Search className="mb-3 h-6 w-6 text-accent" />
                  <h3 className="text-heading-md mb-2 text-text">
                    {t('wingman.feature1Title')}
                  </h3>
                  <p className="text-body-md text-muted">
                    {t('wingman.feature1Desc')}
                  </p>
                </div>
                <div className="rounded-2xl border border-cardBorder bg-surface p-5">
                  <MessageIcon className="mb-3 h-6 w-6 text-accent" />
                  <h3 className="text-heading-md mb-2 text-text">
                    {t('wingman.feature2Title')}
                  </h3>
                  <p className="text-body-md text-muted">
                    {t('wingman.feature2Desc')}
                  </p>
                </div>
                <div className="rounded-2xl border border-cardBorder bg-surface p-5">
                  <Edit className="mb-3 h-6 w-6 text-accent" />
                  <h3 className="text-heading-md mb-2 text-text">
                    {t('wingman.feature3Title')}
                  </h3>
                  <p className="text-body-md text-muted">
                    {t('wingman.feature3Desc')}
                  </p>
                </div>
                <div className="rounded-2xl border border-cardBorder bg-surface p-5">
                  <Brain className="mb-3 h-6 w-6 text-accent" />
                  <h3 className="text-heading-md mb-2 text-text">
                    {t('wingman.feature4Title')}
                  </h3>
                  <p className="text-body-md text-muted">
                    {t('wingman.feature4Desc')}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-96 w-full max-w-md rounded-3xl bg-surface2 p-8 border border-cardBorder">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cardBorder">
                  <div className="h-10 w-10 rounded-full bg-accentSoft flex items-center justify-center">
                    <Heart className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-body-md font-medium text-text">{t('wingman.chatTitle')}</p>
                    <p className="text-body-sm text-muted">{t('wingman.chatOnline')}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-surface p-4">
                    <p className="text-body-md text-text">
                      {t('wingman.chatMessage1')}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-accentCTA p-4 ml-8">
                    <p className="text-body-md text-white">
                      {t('wingman.chatMessage2')}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-surface p-4">
                    <p className="text-body-md text-text">
                      {t('wingman.chatMessage3')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="border-t border-cardBorder bg-surface px-4 md:px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Shield className="mx-auto mb-6 h-16 w-16 text-accent" />
          <h2 className="text-heading-lg mb-4 text-text">{t('privacy.title')}</h2>
          <p className="text-body-lg text-muted md:text-heading-md leading-relaxed max-w-2xl mx-auto">
            {t('privacy.description')}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 md:px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-heading-lg mb-4 text-text">{t('howItWorks.title')}</h2>
            <p className="text-body-lg text-muted max-w-xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accentSoft">
                <span className="text-heading-md text-accent">1</span>
              </div>
              <h3 className="text-heading-md mb-3 text-text">{t('howItWorks.step1Title')}</h3>
              <p className="text-body-md text-muted">
                {t('howItWorks.step1Desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accentSoft">
                <span className="text-heading-md text-accent">2</span>
              </div>
              <h3 className="text-heading-md mb-3 text-text">{t('howItWorks.step2Title')}</h3>
              <p className="text-body-md text-muted">
                {t('howItWorks.step2Desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accentSoft">
                <span className="text-heading-md text-accent">3</span>
              </div>
              <h3 className="text-heading-md mb-3 text-text">{t('howItWorks.step3Title')}</h3>
              <p className="text-body-md text-muted">
                {t('howItWorks.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="border-t border-cardBorder bg-surface px-4 md:px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-heading-lg mb-4 text-text">{t('pricing.title')}</h2>
          <p className="text-body-lg mb-10 text-muted max-w-xl mx-auto">
            {t('pricing.description')}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup" locale={locale}>
              <PrimaryCTA size="large">{t('pricing.cta')}</PrimaryCTA>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Social Proof Strip */}
      <div className="border-t border-cardBorder/50 bg-surface/30 py-10">
        <div className="flex items-center justify-center gap-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 rounded-full bg-surface border border-cardBorder px-4 py-2">
            <span className="text-lg">+</span>
            <span className="text-body-md font-medium text-text">{t('socialProof.users')}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-surface border border-cardBorder px-4 py-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current text-accent" />
              ))}
            </div>
            <span className="text-body-md font-medium text-text">{t('socialProof.rating')}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer
        tagline={t('footer.tagline')}
        company={{
          title: t('footer.company'),
          about: t('footer.about'),
          contact: t('footer.contact'),
        }}
        legal={{
          title: t('footer.legal'),
          privacy: t('footer.privacy'),
          terms: t('footer.terms'),
        }}
        copyright={t('footer.copyright')}
      />
    </div>
  )
}
