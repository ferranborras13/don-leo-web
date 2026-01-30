# Next.js App Router Layout Fix - DonLeo

## Root Cause (3 bullets)

1. **Root layout violated Next.js contract** - `src/app/layout.tsx` (the root layout) only returned `children` without `<html>` and `<body>` tags, which Next.js App Router requires

2. **Duplicate html/body tags in nested layout** - `src/app/[locale]/layout.tsx` (a nested layout) had `<html lang={localeParam}>` and `<body>` tags, violating Next.js rule that only the root layout should have these tags

3. **Language switcher created invalid paths** - The switcher wasn't properly using next-intl's router API, causing paths like `/en/es` instead of `/es`

---

## Files Modified

### 1. `src/app/layout.tsx` - Root Layout (FIXED)

```diff
+ import type { Metadata } from "next"
+ import { Inter } from "next/font/google"
+ import "./globals.css"
+ import { Providers } from "@/components/providers"
+
+ const inter = Inter({ subsets: ["latin"] })
+
+ export const metadata: Metadata = {
+   title: "DonLeo — Your AI Dating Wingman",
+   description: "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
+   icons: {
+     icon: "/icon.png",
+     apple: "/icon.png",
+   },
+   openGraph: {
+     title: "DonLeo — Your AI Dating Wingman",
+     description: "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
+     images: [
+       {
+         url: "/brand/donleo-logo.png",
+         width: 1200,
+         height: 630,
+         alt: "DonLeo - Your AI Dating Wingman",
+       },
+     ],
+     siteName: "DonLeo",
+     type: "website",
+   },
+   twitter: {
+     card: "summary_large_image",
+     title: "DonLeo — Your AI Dating Wingman",
+     description: "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
+     images: ["/brand/donleo-logo.png"],
+   },
+ }
+
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
-   return children
+   return (
+     <html lang="en" suppressHydrationWarning>
+       <body className={inter.className}>
+         <Providers>{children}</Providers>
+       </body>
+     </html>
+   )
  }
```

### 2. `src/app/[locale]/layout.tsx` - Locale Layout (FIXED)

```diff
  import type { Metadata } from "next"
  import { routing } from '@/i18n/routing'
  import { NextIntlClientProvider } from 'next-intl'
  import { getMessages, getTranslations } from 'next-intl/server'
  import { redirect } from 'next/navigation'
  import { locales, defaultLocale } from '@/i18n/request'
+ import { LangAttributeUpdater } from "@/components/layout/lang-attribute-updater"

  export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
  }

  export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'landing' })

    return {
      title: t('meta.title') || "DonLeo — Your AI Dating Wingman",
      description: t('meta.description') || "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
    }
  }

  export default async function LocaleLayout({
    children,
    params,
  }: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
  }) {
    const { locale: localeParam } = await params

    // Validate locale - if invalid, redirect to default locale
    if (!locales.includes(localeParam as any)) {
      redirect(`/${defaultLocale}`)
    }

    // Providing all messages to the client side
    // Get messages for the current locale
    const messages = await getMessages({ locale: localeParam })

    return (
      <NextIntlClientProvider messages={messages}>
-       {children}
+       <LangAttributeUpdater />
+       {children}
      </NextIntlClientProvider>
    )
  }
```

### 3. `src/components/layout/lang-attribute-updater.tsx` - NEW FILE

```typescript
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
```

---

## How It Works Now

### Layout Structure

```
app/
├── layout.tsx              (ROOT - has <html> & <body>)
└── [locale]/
    ├── layout.tsx          (NESTED - has NextIntlClientProvider + LangAttributeUpdater)
    └── (root)/
        └── page.tsx        (Landing page)
```

### Layout Hierarchy

1. **Root Layout** (`app/layout.tsx`):
   - Contains `<html>` and `<body>` tags (required by Next.js)
   - Wraps children with `Providers`
   - Sets default `lang="en"` (gets updated dynamically by `LangAttributeUpdater`)

2. **Locale Layout** (`app/[locale]/layout.tsx`):
   - Does NOT contain `<html>` or `<body>` tags (correct for nested layout)
   - Wraps children with `NextIntlClientProvider` for i18n
   - Renders `LangAttributeUpdater` to dynamically update the HTML lang attribute
   - Validates locale and redirects to default if invalid

### Dynamic Lang Attribute

The `LangAttributeUpdater` component:
- Is rendered inside `NextIntlClientProvider` (so it has access to `useLocale()`)
- Updates `document.documentElement.lang` when the locale changes
- Renders nothing (returns `null`)
- Runs on the client side via `useEffect`

### Language Switching

The language switcher uses next-intl's router API:
```typescript
router.replace(pathname, { locale: newLocale })
```

This correctly:
- Preserves the current pathname
- Changes only the locale segment
- Maintains query params and hash automatically
- Sets a cookie for persistence

---

## Verification Steps

### 1. Start the dev server
```bash
npm run dev
```

### 2. Test language switching on landing page
- Visit http://localhost:3000 (redirects to /en)
- Click each language button (EN, ES, IT, FR, DE)
- **Verify**: URL changes correctly (e.g., `/en` → `/es`, NOT `/en/es`)
- **Verify**: No "Missing required html tags" error
- **Verify**: No 404 errors

### 3. Test route preservation
- Visit http://localhost:3000/en/signup
- Click ES button
- **Verify**: URL becomes `/es/signup`
- **Verify**: Page loads without errors

### 4. Verify HTML lang attribute
- Open browser DevTools (F12)
- Go to Elements/Inspector tab
- Look at the `<html>` tag
- **Verify**: `lang="en"` when on English pages
- Click ES button
- **Verify**: `lang="es"` after switching to Spanish

### 5. Check console for errors
- Open browser DevTools (F12)
- Go to Console tab
- **Verify**: No errors about missing html tags
- **Verify**: No intl context errors

---

## Important Notes

### Next.js App Router Layout Rules

1. **Root Layout** (`app/layout.tsx`):
   - MUST have `<html>` and `<body>` tags
   - Is the outermost layout
   - Cannot be omitted

2. **Nested Layouts** (`app/[locale]/layout.tsx`, etc.):
   - MUST NOT have `<html>` or `<body>` tags
   - Only wrap children with providers/context
   - Can have their own metadata

3. **Route Groups** (`(root)`, `(app)` etc.):
   - Don't affect URL structure
   - Can have their own layouts
   - Must NOT have `<html>` or `<body>` tags

### Why This Approach Works

1. **Root layout provides the html/body structure** required by Next.js
2. **Locale layout provides i18n context** without duplicating html/body
3. **LangAttributeUpdater updates the lang attribute** dynamically based on current locale
4. **Language switcher uses proper next-intl API** to avoid invalid paths

### Common Pitfalls to Avoid

❌ **DON'T**: Put `<html>` or `<body>` in nested layouts
❌ **DON'T**: Use `useLocale()` outside of `NextIntlClientProvider`
❌ **DON'T**: Manually construct locale paths like `/${locale}${pathname}`
✅ **DO**: Use `router.replace(pathname, { locale })` from next-intl
✅ **DO**: Keep html/body only in the root layout
✅ **DO**: Use client components for dynamic DOM updates like lang attribute

---

## Troubleshooting

### Error: "Missing required html tags"

**Cause**: Root layout doesn't have `<html>` and `<body>` tags

**Fix**: Ensure `app/layout.tsx` has:
```typescript
return (
  <html lang="en">
    <body>
      {children}
    </body>
  </html>
)
```

### Error: "No intl context found"

**Cause**: Using `useLocale()` outside of `NextIntlClientProvider`

**Fix**: Ensure the component is rendered inside the locale layout (which has the provider)

### Language switch causes 404

**Cause**: Incorrect pathname manipulation or invalid route

**Fix**: Use `router.replace(pathname, { locale: newLocale })` from next-intl's routing

### Lang attribute doesn't update

**Cause**: `LangAttributeUpdater` not rendered or rendered outside provider

**Fix**: Ensure it's rendered inside `NextIntlClientProvider` in the locale layout

---

## Quick Reference

### File Locations
- Root Layout: `src/app/layout.tsx`
- Locale Layout: `src/app/[locale]/layout.tsx`
- Lang Updater: `src/components/layout/lang-attribute-updater.tsx`
- Language Switcher: `src/components/ui/language-switcher.tsx`
- Routing Config: `src/i18n/routing.ts`
- Middleware: `middleware.ts`

### Supported Locales
```typescript
['en', 'es', 'it', 'fr', 'de']
```

### Default Locale
```typescript
'en'
```

### Locale Persistence Cookie
```typescript
NEXT_LOCALE={locale};path=/;max-age=31536000
```
