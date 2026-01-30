"use client"

import React, { useState } from "react"
import { useRouter } from "@/i18n/routing"
import { useLocale, useTranslations } from 'next-intl'
import { LogOut, Trash2, Check, Crown, Sparkles, User, Mail, Shield, X } from "lucide-react"
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface PricingPlan {
  id: 'weekly' | 'monthly' | 'annual'
  name: string
  price: string
  period: string
  badge?: string
  popular?: boolean
  savePercent?: string
}

export default function ProfilePage() {
  const t = useTranslations('subscription')
  const locale = useLocale()
  const { user, profile, signOut } = useAuth()
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // TODO: Use real premium status from profile.isPremium when backend is connected
  // For now, default to false so pricing cards show
  const isPremium = profile?.isPremium || false

  const handleLogout = async () => {
    await signOut()
    router.push("/login", { locale })
  }

  const handleDeleteAccount = () => {
    // TODO: Implement actual delete account logic
    setShowDeleteModal(false)
    alert(t('deleteAccount.notImplemented'))
  }

  const handleCancelSubscription = () => {
    // TODO: Implement actual cancel subscription logic
    alert(t('deleteAccount.notImplemented'))
  }

  const plans: PricingPlan[] = [
    {
      id: 'weekly',
      name: t('plans.weekly.name'),
      price: '€3.99',
      period: t('plans.weekly.period'),
    },
    {
      id: 'monthly',
      name: t('plans.monthly.name'),
      price: '€8.99',
      period: t('plans.monthly.period'),
      badge: t('plans.monthly.badge'),
      popular: true,
    },
    {
      id: 'annual',
      name: t('plans.annual.name'),
      price: '€49.99',
      period: t('plans.annual.period'),
      badge: t('plans.annual.badge'),
      savePercent: t('plans.annual.savePercent'),
    },
  ]

  const features = [
    t('features.unlimited'),
    t('features.modes'),
    t('features.screenshots'),
    t('features.tone'),
    t('features.rewrite'),
    t('features.multilingual'),
    t('features.priority'),
    t('features.earlyAccess'),
  ]

  const displayName = profile?.displayName || user?.email?.split("@")[0] || t('profileNameLabel')
  const email = user?.email || "—"

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        {/* Profile Summary Card */}
        <div className="mb-8 rounded-3xl border border-cardBorder bg-gradient-to-br from-surface to-surface2 p-6 relative overflow-hidden">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accentSoft/10 to-transparent pointer-events-none" />

          <div className="relative flex items-center gap-6">
            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accentSoft to-accentSoft/50 border border-accentBorderSoft">
              <User className="h-8 w-8 text-accent" />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-heading-lg text-text mb-1">{t('profileTitle')}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-body-md text-muted">
                  <span className="font-medium">{displayName}</span>
                  <span className="text-accent/40">•</span>
                  <span className="text-sm">{email}</span>
                </div>
              </div>
            </div>

            {/* Plan Status Badge */}
            <div className={cn(
              "px-4 py-2 rounded-full border text-sm font-semibold",
              isPremium
                ? "bg-accentCTA/10 border-accentCTA text-accentCTA"
                : "bg-accentSoft/30 border-accentBorderSoft text-accent"
            )}>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span>{isPremium ? t('planStatus.premium') : t('planStatus.free')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium State - Manage Subscription */}
        {isPremium ? (
          <div className="mx-auto max-w-2xl">
            {/* Premium Plan Card */}
            <div className="mb-8 rounded-3xl border-2 border-accentCTA bg-gradient-to-b from-accentSoft/30 to-surface p-8 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accentCTA/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accentCTA px-4 py-2">
                  <Crown className="h-4 w-4 text-white" />
                  <span className="text-body-sm font-semibold text-white">{t('premiumActive')}</span>
                </div>

                <h3 className="text-heading-xl text-text mb-2">{t('manageTitle')}</h3>
                <p className="text-body-lg text-muted mb-6">{t('manageSubtitle')}</p>

                <div className="flex items-center gap-2 text-body-sm text-muted mb-6">
                  <Shield className="h-4 w-4" />
                  <span>{t('cancelAnytime')}</span>
                </div>

                <button
                  onClick={handleCancelSubscription}
                  className="w-full rounded-2xl border-2 border-accentCTA bg-surface px-6 py-3 text-body-lg font-semibold text-accentCTA hover:bg-accentCTA/10 transition-colors"
                >
                  {t('cancelSubscription')}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rounded-3xl border border-cardBorder bg-surface p-6">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cardBorder bg-surface2 px-5 py-3 text-body-lg text-text transition-colors hover:bg-surface3 hover:border-accentBorderSoft mb-4"
              >
                <LogOut className="h-5 w-5" />
                {t('logout')}
              </button>

              {/* Delete Account Section */}
              <div className="border-t border-cardBorder pt-4">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-body-lg text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 className="h-5 w-5" />
                  {t('deleteAccount.button')}
                </button>
                <p className="mt-2 text-center text-body-sm text-muted">
                  {t('deleteAccount.warning')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Free State - Subscription Pricing */}
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accentSoft/30 border border-accentBorderSoft px-4 py-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-body-sm font-medium text-accent">{t('trialBadge')}</span>
              </div>
              <h1 className="text-heading-xl text-text mb-3">{t('title')}</h1>
              <p className="text-body-lg text-muted mb-2">{t('subtitle')}</p>
              <p className="text-body-sm text-muted">{t('secure')}</p>
            </div>

            {/* Pricing Cards */}
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-3xl border-2 p-6 transition-all hover:scale-[1.02]",
                    plan.popular
                      ? "border-accentCTA bg-gradient-to-b from-accentSoft/30 to-surface shadow-lg shadow-accentCTA/20"
                      : "border-cardBorder bg-surface hover:border-accentBorderSoft"
                  )}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="mb-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                        plan.popular
                          ? "bg-accentCTA text-white"
                          : "bg-accentSoft text-accent"
                      )}>
                        {plan.badge}
                      </span>
                      {plan.savePercent && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accentSoft px-2 py-0.5 text-xs font-medium text-accent">
                          {plan.savePercent}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Plan Name & Price */}
                  <h3 className={cn(
                    "text-heading-lg mb-2",
                    plan.popular ? "text-accentCTA" : "text-text"
                  )}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className={cn(
                      "text-4xl font-bold",
                      plan.popular ? "text-accentCTA" : "text-text"
                    )}>
                      {plan.price}
                    </span>
                    <span className="text-body-md text-muted">/{plan.period}</span>
                  </div>

                  {/* CTA */}
                  <button className={cn(
                    "w-full rounded-2xl px-4 py-3 text-body-lg font-semibold transition-all mb-3",
                    plan.popular
                      ? "bg-accentCTA text-white hover:bg-accentPressed shadow-md"
                      : "bg-accentSoft text-accent hover:bg-accentSoft/80"
                  )}>
                    {t('cta')}
                  </button>
                  <p className="text-center text-body-sm text-muted mb-6">
                    {t('thenPrice', { price: plan.price, period: plan.period })}
                  </p>
                  <p className="text-center text-body-xs text-muted italic">
                    {t('cancelAnytime')}
                  </p>

                  {/* Features */}
                  <div className="mt-6 space-y-3">
                    {features.slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className={cn(
                          "h-4 w-4 mt-0.5 flex-shrink-0",
                          plan.popular ? "text-accentCTA" : "text-accent"
                        )} />
                        <span className="text-body-sm text-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Logout & Delete Account Section */}
            <div className="mx-auto max-w-md">
              <div className="rounded-3xl border border-cardBorder bg-surface p-6">
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cardBorder bg-surface2 px-5 py-3 text-body-lg text-text transition-colors hover:bg-surface3 hover:border-accentBorderSoft"
                >
                  <LogOut className="h-5 w-5" />
                  {t('logout')}
                </button>

                {/* Delete Account Section */}
                <div className="mt-6 pt-6 border-t border-cardBorder">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-body-lg text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <Trash2 className="h-5 w-5" />
                    {t('deleteAccount.button')}
                  </button>
                  <p className="mt-2 text-center text-body-sm text-muted">
                    {t('deleteAccount.warning')}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-surface p-6 shadow-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mx-auto">
                <Trash2 className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-heading-lg text-text mb-2 text-center">
                {t('deleteAccount.modalTitle')}
              </h3>
              <p className="text-body-md text-muted mb-6 text-center">
                {t('deleteAccount.modalDescription')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 rounded-2xl border border-cardBorder bg-surface2 px-4 py-3 text-body-md font-medium text-text transition-colors hover:bg-surface3"
                >
                  {t('deleteAccount.cancel')}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-body-md font-medium text-white transition-colors hover:bg-red-600"
                >
                  {t('deleteAccount.confirm')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
