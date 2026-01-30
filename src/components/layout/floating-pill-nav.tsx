"use client"

import React from "react"
import { Link } from '@/i18n/routing'
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { MessageSquare, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

export function FloatingPillNav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: t('wingman'), href: '/app/wingman', icon: MessageSquare },
    { label: t('rizzle'), href: '/app/rizz', icon: Sparkles },
    { label: t('profile'), href: '/app/profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden">
      <div className="flex items-center gap-1 rounded-full bg-surface2/95 backdrop-blur-sm border border-cardBorder px-2 py-2 shadow-xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2.5 transition-all",
                isActive
                  ? "bg-accentCTA text-white"
                  : "text-muted hover:text-text hover:bg-surface"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-body-md font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
