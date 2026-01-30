import type { Metadata } from "next"
import { routing } from "@/i18n/routing"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales } from "@/i18n/request"
import { LangAttributeUpdater } from "@/components/layout/lang-attribute-updater"
import { I18nSmokeTest } from "@/components/i18n/I18nSmokeTest"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params

  // CRITICAL: Tell next-intl what locale we're using
  setRequestLocale(locale)

  // CRITICAL: Pass locale to getTranslations so it loads the correct language
  const t = await getTranslations({ locale, namespace: "landing" })
  return {
    title: t("meta.title") || "DonLeo — Your AI Dating Wingman",
    description:
      t("meta.description") ||
      "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control."
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale: localeParam } = params

  if (!locales.includes(localeParam as any)) notFound()

  // ✅ THIS is the missing piece for server components to use the right locale
  setRequestLocale(localeParam)

  const messages = await getMessages({ locale: localeParam })

  return (
    <NextIntlClientProvider locale={localeParam} messages={messages}>
      <LangAttributeUpdater />
      <I18nSmokeTest />
      {children}
    </NextIntlClientProvider>
  )
}

