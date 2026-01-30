"use client"

import { useState, useEffect } from "react"
import { useRouter, Link } from "@/i18n/routing"
import { useLocale, useTranslations } from 'next-intl'
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { useAuth, getAuthErrorMessage } from "@/contexts/auth-context"
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"

export default function SignupPage() {
  const t = useTranslations('auth.signup')
  const locale = useLocale()
  const router = useRouter()
  const { signUp, user, loading } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to app if already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push("/app", { locale })
    }
  }, [user, loading, router, locale])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Create account with Firebase
      await signUp(email, password, name)
      // Navigate to app after successful sign up
      router.push("/app", { locale })
      router.refresh()
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <DonLeoLogo size="lg" priority href="/" locale={locale} />
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-cardBorder bg-surface p-8">
          <h1 className="text-heading-lg mb-2 text-text">{t('title')}</h1>
          <p className="text-body-md mb-8 text-muted">
            {t('subtitle')}
          </p>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-3">
              <p className="text-body-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-body-md text-text">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                className="w-full rounded-2xl border border-cardBorder bg-surface2 px-4 py-3 text-body-md text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-body-md text-text">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className="w-full rounded-2xl border border-cardBorder bg-surface2 px-4 py-3 text-body-md text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-body-md text-text">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className="w-full rounded-2xl border border-cardBorder bg-surface2 px-4 py-3 text-body-md text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
                minLength={6}
                disabled={isLoading}
              />
              <p className="mt-2 text-body-sm text-muted">
                {t('passwordHint')}
              </p>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 shrink-0 rounded border-cardBorder bg-surface2 text-accent focus:ring-accent"
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-body-sm text-muted">
                {t('agree')}{" "}
                <Link href="/terms" locale={locale} className="text-accent hover:text-accentPressed">
                  {t('termsOfService')}
                </Link>{" "}
                {t('and')}{" "}
                <Link href="/privacy" locale={locale} className="text-accent hover:text-accentPressed">
                  {t('privacyPolicy')}
                </Link>
              </label>
            </div>

            <PrimaryCTA type="submit" size="large" className="w-full" disabled={isLoading}>
              {isLoading ? t('buttonLoading') : t('button')}
            </PrimaryCTA>
          </form>

          <div className="mt-6 text-center">
            <p className="text-body-md text-muted">
              {t('hasAccount')}{" "}
              <Link
                href="/login"
                locale={locale}
                className="text-accent hover:text-accentPressed transition-colors"
              >
                {t('signinLink')}
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-body-sm text-muted">
          {t('freeTrial')}
        </p>
      </div>
    </div>
  )
}
