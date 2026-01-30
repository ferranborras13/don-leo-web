"use client"

import { useTranslations } from "next-intl"

/**
 * Minimal smoke test component for i18n verification
 * Renders invisibly (sr-only) but shows current locale is working
 */
export function I18nSmokeTest() {
  const t = useTranslations("debug")

  return (
    <span className="sr-only" aria-hidden="true">
      DEBUG: {t("hello")}
    </span>
  )
}
