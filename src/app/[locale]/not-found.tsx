"use client"

import { Link } from '@/i18n/routing'
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { useLocale } from "next-intl"

export default function LocaleNotFound() {
  const locale = useLocale()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-heading-xl text-text mb-4">404</h1>
        <p className="text-body-lg text-muted mb-8">
          Page not found
        </p>
        <Link href="/" locale={locale}>
          <PrimaryCTA size="default">Go home</PrimaryCTA>
        </Link>
      </div>
    </div>
  )
}
