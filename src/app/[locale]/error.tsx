"use client"

import { useEffect } from 'react'
import { useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    // Log error to console for debugging
    console.error('Locale error:', error)

    // On locale-related errors, redirect to home in current locale
    if (error.message?.includes('locale') || error.message?.includes('messages')) {
      router.push('/', { locale })
    }
  }, [error, router, locale])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-3xl border border-cardBorder bg-surface p-8">
          <h1 className="text-heading-xl text-text mb-4">Something went wrong</h1>
          <p className="text-body-md text-muted mb-6">
            {error.message || 'An error occurred while loading the page.'}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={reset}
              className="w-full rounded-2xl bg-accentCTA text-white px-6 py-3 font-medium hover:bg-accentPressed transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => router.push('/', { locale })}
              className="w-full rounded-2xl border border-cardBorder text-text px-6 py-3 font-medium hover:bg-surface2 transition-colors"
            >
              Go to home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
