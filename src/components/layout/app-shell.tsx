"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { MessageSquare, Sparkles, User, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingPillNav } from "./floating-pill-nav"
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { Link as I18nLink } from '@/i18n/routing'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const t = useTranslations('nav')
  const tProfile = useTranslations('profile')
  const locale = useLocale()
  const pathname = usePathname()

  // Top navigation: only Wingman and Rizzle
  const navItems: NavItem[] = [
    { label: t('wingman'), href: '/app/wingman', icon: MessageSquare },
    { label: t('rizzle'), href: '/app/rizz', icon: Sparkles },
  ]

  const isProfileActive = pathname === `/app/profile` || pathname.startsWith(`/app/profile/`)

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:z-40 md:flex md:h-screen md:w-64 md:flex-col md:border-r md:border-cardBorder md:bg-surface">
        {/* Logo - Centered */}
        <div className="flex items-center justify-center px-6 py-8">
          <I18nLink href="/app" locale={locale}>
            <DonLeoLogo size="xl" priority />
          </I18nLink>
        </div>

        {/* Navigation - Top Section */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <I18nLink
                key={item.href}
                href={item.href}
                locale={locale}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 transition-all",
                  isActive
                    ? "bg-accentCTA text-white"
                    : "text-muted hover:bg-surface2 hover:text-text"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-body-lg font-medium">{item.label}</span>
              </I18nLink>
            )
          })}
        </nav>

        {/* Profile Entry - Premium Glass Look */}
        <div className="border-t border-cardBorder px-4 py-4">
          <I18nLink
            href="/app/profile"
            locale={locale}
            className={cn(
              "relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all overflow-hidden group",
              isProfileActive
                ? "bg-gradient-to-r from-accentCTA/20 to-accentCTA/10 border-2 border-accentCTA"
                : "bg-gradient-to-r from-accentSoft/30 to-accentSoft/10 border border-accentBorderSoft hover:from-accentSoft/50 hover:to-accentSoft/20 hover:border-accent/50"
            )}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accentSoft group-hover:scale-110 transition-transform">
              <Crown className={cn("h-5 w-5", isProfileActive ? "text-accentCTA" : "text-accent")} />
            </div>
            <div className="relative flex-1">
              <p className={cn("text-body-md font-medium", isProfileActive ? "text-accentCTA" : "text-text")}>{t('yourProfile')}</p>
              <p className="text-body-sm text-muted">{tProfile('subscription')}</p>
            </div>
          </I18nLink>
        </div>

        {/* Language Switcher */}
        <div className="border-t border-cardBorder px-4 py-4">
          <LanguageSwitcher className="w-full" />
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-30 border-b border-cardBorder bg-surface/80 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-center px-4 py-4">
          <I18nLink href="/app" locale={locale}>
            <DonLeoLogo size="sm" />
          </I18nLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:ml-64 md:pb-0">
        <div className="min-h-screen">{children}</div>
      </main>

      {/* Mobile Floating Nav */}
      <FloatingPillNav />
    </div>
  )
}
