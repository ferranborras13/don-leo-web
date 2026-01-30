"use client"

import { useEffect } from "react"
import { useLocale } from "next-intl"

/**
 * Client component that dynamically updates the HTML lang attribute
 * based on the current locale from next-intl
 */
export function LangAttributeUpdater() {
  const locale = useLocale()

  useEffect(() => {
    // Update the html lang attribute when locale changes
    document.documentElement.lang = locale
  }, [locale])

  // This component doesn't render anything
  return null
}
