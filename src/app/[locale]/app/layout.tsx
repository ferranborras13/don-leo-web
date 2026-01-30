"use client"

import { AppShell } from "@/components/layout/app-shell"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useEffect } from "react"

// TODO: Re-enable auth before production - set NEXT_PUBLIC_DEV_BYPASS_AUTH=false or remove this env var
const BYPASS_AUTH = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    // Skip auth check if bypass is enabled
    if (BYPASS_AUTH) return

    // Redirect to login if not authenticated
    // router.replace('/login', { locale }) automatically navigates to /{locale}/login
    if (!loading && !user) {
      router.replace('/login', { locale })
    }
  }, [user, loading, router, locale])

  // If bypassed, skip loading and auth checks
  if (BYPASS_AUTH) {
    return <AppShell>{children}</AppShell>
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!user) {
    // Return loading placeholder while redirecting
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    )
  }

  return <AppShell>{children}</AppShell>
}
