"use client"

import { useLocale } from "next-intl"
import Link from "next/link"
import { DonLeoLogo } from "@/components/Brand/DonLeoLogo"

interface FooterProps {
  tagline: string
  company: {
    title: string
    about: string
    contact: string
  }
  legal: {
    title: string
    privacy: string
    terms: string
  }
  copyright: string
}

function withLocale(locale: string, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`
  return `/${locale}${clean}`.replace(/\/+$/, "")
}

export function Footer({ tagline, company, legal, copyright }: FooterProps) {
  const locale = useLocale()

  return (
    <footer className="border-t border-cardBorder px-4 md:px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <DonLeoLogo size="sm" href={`/${locale}`} />
            </div>
            <p className="text-body-sm text-muted">
              {tagline}
            </p>
          </div>
          <div>
            <h4 className="text-heading-md mb-4 text-text">{company.title}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={withLocale(locale, "/about")} className="text-body-md text-muted hover:text-text transition-colors">
                  {company.about}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/contact")} className="text-body-md text-muted hover:text-text transition-colors">
                  {company.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-heading-md mb-4 text-text">{legal.title}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={withLocale(locale, "/privacy")} className="text-body-md text-muted hover:text-text transition-colors">
                  {legal.privacy}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/terms")} className="text-body-md text-muted hover:text-text transition-colors">
                  {legal.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-cardBorder pt-8 text-center">
          <p className="text-body-sm text-muted">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
