"use client"

import { useTranslations } from 'next-intl'
import { Crown, Check } from "lucide-react"
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { Link } from '@/i18n/routing'

interface Plan {
  id: 'weekly' | 'monthly' | 'yearly'
  name: string
  price: number
  period: string
  badge?: string
  popular?: boolean
  bestValue?: boolean
  savings?: string
}

export default function SubscriptionPage() {
  const t = useTranslations('subscription')

  const plans: Plan[] = [
    {
      id: 'weekly',
      name: t('planWeekly'),
      price: 3.99,
      period: t('perWeek'),
    },
    {
      id: 'monthly',
      name: t('planMonthly'),
      price: 8.99,
      period: t('perMonth'),
      badge: t('badgePopular'),
      popular: true,
    },
    {
      id: 'yearly',
      name: t('planYearly'),
      price: 49.99,
      period: t('perYear'),
      badge: t('badgeBestValue'),
      bestValue: true,
      savings: t('savings'),
    },
  ]

  const features = [
    t('featureUnlimited'),
    t('featureModes'),
    t('featurePriority'),
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-cardBorder">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 max-w-6xl mx-auto">
          <Link href="/app">
            <DonLeoLogo size="md" priority />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-12 md:py-16 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-accentCTA" />
            <h1 className="text-4xl md:text-5xl font-bold text-text">
              {t('title')}
            </h1>
          </div>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 p-6 md:p-8 flex flex-col ${
                plan.popular
                  ? 'border-accentCTA bg-surface shadow-lg shadow-accentCTA/20'
                  : plan.bestValue
                  ? 'border-accent bg-surface shadow-lg shadow-accent/20'
                  : 'border-cardBorder bg-surface'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold ${
                    plan.popular
                      ? 'bg-accentCTA text-white'
                      : 'bg-accent text-white'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Savings Badge */}
              {plan.bestValue && plan.savings && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accentSoft text-accent text-xs font-semibold">
                  {plan.savings}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-text mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text">
                    €{plan.price}
                  </span>
                  <span className="text-muted">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accentCTA flex-shrink-0 mt-0.5" />
                    <span className="text-text">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="space-y-3">
                <PrimaryCTA
                  size="large"
                  className={`w-full ${
                    plan.popular || plan.bestValue ? '' : 'bg-surface2 text-text hover:bg-surface3'
                  }`}
                >
                  {t('trialCta')}
                </PrimaryCTA>
                <p className="text-center text-sm text-muted">
                  Then €{plan.price}/{plan.period}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Free Plan Note */}
        <div className="text-center text-muted text-body-md">
          {t('freePlanNote')}
        </div>
      </main>
    </div>
  )
}
