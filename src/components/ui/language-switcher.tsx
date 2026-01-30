"use client"

import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from "next-intl"
import { useTransition } from "react"

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
] as const

const LOCALES = ["en", "es", "it", "fr", "de"] as const

interface LanguageSwitcherProps {
  className?: string
}

/**
 * Strip locale prefix from pathname
 * Expected inputs: "/", "/fr", "/fr/app", "/fr/app/wingman"
 * Returns: pathname WITHOUT locale prefix
 */
function stripLocalePrefix(pathname: string): string {
  // Handle empty or root
  if (!pathname || pathname === "/") return "/"

  // Remove trailing slash for processing
  const cleanPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

  // Split and check if first segment is a locale
  const parts = cleanPath.split("/")
  const firstSegment = parts[1] // parts[0] is always empty string for absolute paths

  if (firstSegment && LOCALES.includes(firstSegment as any)) {
    // First segment IS a locale, remove it
    const rest = parts.slice(2).join("/")
    return rest || "/"
  }

  // First segment is NOT a locale, return path as-is
  return cleanPath
}

/**
 * Language switcher component
 * Switches locale while preserving the current route
 */
export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const rawPathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return

    // Strip locale prefix from pathname
    // usePathname() may return path with locale prefix like "/en/app/wingman"
    // We need to pass pathname WITHOUT locale to router.replace
    const cleanPathname = stripLocalePrefix(rawPathname)

    // IMPORTANT: pass the pathname WITHOUT locale.
    // Let next-intl add the locale prefix via { locale }.
    startTransition(() => {
      router.replace(cleanPathname, { locale: newLocale })
    })
  }

  return (
    <div className={`flex items-center justify-center gap-1 rounded-full bg-surface border border-cardBorder p-1 ${className}`}>
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          disabled={isPending}
          className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition-all ${
            locale === loc.code
              ? 'bg-accentCTA text-white shadow-sm'
              : 'text-muted hover:text-text hover:bg-surface2'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={`Switch to ${loc.label}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  )
}
