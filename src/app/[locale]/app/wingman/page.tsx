"use client"

import React from "react"
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MessageSquare } from "lucide-react"
import Image from "next/image"
import { PastelTile } from "@/components/ui/pastel-tile"
import { PrimaryCTA } from "@/components/ui/primary-cta"

// Get localized features data
const getLocalizedFeatures = (t: any) => [
  {
    id: "analyze",
    title: t('features.analyze.title'),
    description: t('features.analyze.description'),
    variant: "cream" as const,
    icon: "Search",
  },
  {
    id: "replies",
    title: t('features.replies.title'),
    description: t('features.replies.description'),
    variant: "pink" as const,
    icon: "MessageSquare",
  },
  {
    id: "rewrite",
    title: t('features.rewrite.title'),
    description: t('features.rewrite.description'),
    variant: "lavender" as const,
    icon: "Edit",
  },
  {
    id: "thinking",
    title: t('features.thinking.title'),
    description: t('features.thinking.description'),
    variant: "mint" as const,
    icon: "Brain",
  },
]

export default function WingmanPage() {
  const t = useTranslations()
  const tDashboard = useTranslations('dashboard')
  const locale = useLocale()

  const hour = new Date().getHours()
  const getGreeting = () => {
    if (hour < 12) return tDashboard('greeting.morning')
    if (hour < 18) return tDashboard('greeting.afternoon')
    return tDashboard('greeting.evening')
  }

  const wingmanFeatures = getLocalizedFeatures(t)

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-heading-xl mb-2 text-text">
            {getGreeting()}
          </h1>
          <p className="text-body-lg text-muted">
            {tDashboard('ready')}
          </p>
        </div>

        {/* DonLeo Card */}
        <Link
          href="/app/wingman/chat"
          locale={locale}
          className="mb-6 block rounded-3xl border-2 border-accentBorderSoft bg-accentSoft p-6 transition-all hover:scale-[1.01] hover:border-accent"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cardBorder bg-surface2 overflow-hidden">
                <Image
                  src="/donleo-avatar.png"
                  alt="DonLeo"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-green-500">
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-heading-lg text-text">{tDashboard('chatCard.title')}</h2>
              <p className="text-body-md text-muted">
                {tDashboard('chatCard.subtitle')}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
              <MessageSquare className="h-5 w-5 text-accent" />
            </div>
          </div>
        </Link>

        {/* Marketing Block */}
        <div className="mb-8 text-center">
          <h3 className="text-heading-md mb-2 text-text">
            {tDashboard('marketing.title')}
          </h3>
          <p className="text-body-md text-muted mb-2">
            {tDashboard('marketing.subtitle')}
          </p>
          <p className="text-body-sm text-accent">
            {tDashboard('marketing.pickCard')}
          </p>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-heading-md mb-4 text-text">{tDashboard('featuresTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {wingmanFeatures.map((feature) => {
              const Icon = feature.icon === "Search" ? Search : feature.icon === "MessageSquare" ? MessageSquare : feature.icon === "Edit" ? Edit : Brain
              return (
                <PastelTile
                  key={feature.id}
                  variant={feature.variant}
                  icon={Icon}
                  title={feature.title}
                  description={feature.description}
                  interactive={false}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Import icons at the bottom
import { Search, Edit, Brain } from "lucide-react"
