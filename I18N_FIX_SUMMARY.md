# I18n Routing Fix - DonLeo Website

## Root Cause Analysis

The language switcher was creating invalid URLs like `/en/es` instead of `/es` due to incorrect pathname handling:

1. **Incorrect pathname manipulation**: The language switcher was manually trying to replace the locale segment in the pathname, but `usePathname()` from next-intl returns the pathname **without** the locale prefix (it's already stripped by the middleware).

2. **Wrong router API usage**: The code was manually building paths instead of using next-intl's router API with the `locale` option.

3. **Missing locale-specific not-found page**: There was no `not-found.tsx` in the `[locale]` directory, causing 404 errors to fall back to the root not-found page without proper locale context.

4. **Layout structure issues**: The locale layout was not properly integrated with the Providers wrapper, potentially causing context issues.

## Changes Made

### 1. Fixed Language Switcher (`src/components/ui/language-switcher.tsx`)

**Before:**
```typescript
// Manually manipulating pathname - INCORRECT
const segments = pathname.split('/').filter(Boolean)
let newPathname: string
if (segments.length > 0 && locales.some(l => l.code === segments[0])) {
  segments[0] = newLocale
  newPathname = '/' + segments.join('/')
} else {
  newPathname = `/${newLocale}` + pathname
}
router.replace(newPathname)
```

**After:**
```typescript
// Using next-intl's router with locale option - CORRECT
router.replace(pathname, { locale: newLocale })
```

### 2. Added Locale-Specific Not-Found Page (`src/app/[locale]/not-found.tsx`)

Created a proper 404 page for locale routes to handle cases where a route doesn't exist in a specific locale.

### 3. Fixed Layout Structure

**Updated `src/app/[locale]/layout.tsx`:**
- Added `Providers` wrapper inside the locale layout
- Included proper metadata generation with locale-specific content
- Added `globals.css` import
- Properly structured html/body tags with dynamic `lang` attribute

**Updated `src/app/layout.tsx`:**
- Simplified to minimal wrapper since locale layout replaces html/body
- Removed redundant metadata and Providers (now in locale layout)

### 4. Added E2E Tests (`tests/e2e/language-switcher.spec.ts`)

Comprehensive Playwright tests covering:
- Switching languages on home page without 404
- Preserving routes when switching languages
- Preserving query parameters
- Preserving hash fragments
- Not navigating when clicking same locale
- Persisting locale preference on reload
- Handling nested routes across locales
- Proper 404 handling for genuinely invalid routes

### 5. Added Playwright Configuration

Created `playwright.config.ts` with proper configuration for the project.

### 6. Updated Package Scripts

Added test scripts to `package.json`:
```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui",
"test:e2e:headed": "playwright test --headed"
```

## Files Modified

1. `src/components/ui/language-switcher.tsx` - Fixed locale switching logic
2. `src/app/[locale]/layout.tsx` - Reorganized structure with Providers
3. `src/app/layout.tsx` - Simplified root layout
4. `src/app/[locale]/not-found.tsx` - Created new 404 page (NEW)
5. `tests/e2e/language-switcher.spec.ts` - Created E2E tests (NEW)
6. `playwright.config.ts` - Created Playwright config (NEW)
7. `package.json` - Added test scripts

## How It Works Now

1. **Language Switching**: When a user clicks a language button:
   - Cookie is set for persistence: `NEXT_LOCALE={locale};path=/;max-age=31536000`
   - Router navigates using `router.replace(pathname, { locale: newLocale })`
   - Next.js middleware handles the locale prefix automatically
   - The current route (pathname) is preserved without the locale prefix

2. **URL Structure**:
   - Home: `/en`, `/es`, `/it`, `/fr`, `/de`
   - Signup: `/en/signup`, `/es/signup`, etc.
   - Nested routes: `/en/app/rizz`, `/es/app/rizz`, etc.

3. **Locale Persistence**:
   - Cookie `NEXT_LOCALE` is set on language change
   - Middleware reads the cookie on subsequent visits
   - User is redirected to their preferred locale automatically

4. **Error Handling**:
   - Invalid locale routes show proper 404 page
   - Non-locale routes redirect to default locale
   - Genuinely invalid paths show appropriate error message

## Verification Checklist

### Local Testing

1. **Start the dev server:**
   ```bash
   cd donleo-web
   npm run dev
   ```

2. **Test language switching:**
   - Visit http://localhost:3000
   - Click each language button (EN, ES, IT, FR, DE)
   - Verify URL changes correctly: `/en` → `/es` → `/it` → `/fr` → `/de`
   - Verify NO 404 errors occur

3. **Test route preservation:**
   - Visit http://localhost:3000/en/signup
   - Click ES button
   - Verify URL changes to `/es/signup` (NOT `/en/es` or `/es/es`)
   - Verify page loads without 404

4. **Test query parameters:**
   - Visit http://localhost:3000/en?ref=test&utm_source=website
   - Click ES button
   - Verify URL becomes `/es?ref=test&utm_source=website`

5. **Test hash preservation:**
   - Visit http://localhost:3000/en#features
   - Click ES button
   - Verify URL becomes `/es#features`

6. **Test locale persistence:**
   - Click ES button
   - Refresh the page (Cmd+R or F5)
   - Verify you're still on `/es` (or your current route in Spanish)

### Run E2E Tests

1. **Install Playwright browsers (first time only):**
   ```bash
   npx playwright install chromium
   ```

2. **Run tests:**
   ```bash
   npm run test:e2e
   ```

3. **Run tests in UI mode (interactive):**
   ```bash
   npm run test:e2e:ui
   ```

4. **Run tests in headed mode (see browser):**
   ```bash
   npm run test:e2e:headed
   ```

### Production Verification

1. **Deploy the changes** to your hosting platform (Vercel, Netlify, etc.)

2. **Test in production:**
   - Visit your production URL
   - Repeat all local testing steps above
   - Verify no 404 errors when switching languages
   - Verify all pages load correctly across all locales

3. **Check browser console:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests
   - Verify all language switches result in 200 OK responses

## Important Notes

### Hosting Configuration

For Next.js with next-intl, no special rewrite rules are needed on Vercel (Next.js handles this automatically). However, if you're using:

**Netlify:**
- Ensure `publish` directory is set to `.next`
- No special redirects needed (Next.js handles routing)

**Cloudflare Pages:**
- Set build command to `npm run build`
- Set output directory to `.next`
- No special redirects needed

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Known Limitations

1. **Direct access to non-translated routes**: If a route exists in English but not in Spanish (e.g., `/en/some-page` exists but `/es/some-page` doesn't), accessing `/es/some-page` will result in a 404. This is expected behavior.

2. **Locale detection**: The middleware uses the `NEXT_LOCALE` cookie, `Accept-Language` header, and default locale (in that order) to determine the user's preferred locale.

### Future Improvements

1. **Route fallback**: Implement automatic fallback to default locale for untranslated routes
2. **Hreflang tags**: Add SEO hreflang tags for better locale handling by search engines
3. **Locale auto-detection**: Improve locale detection from IP/geolocation
4. **Translation coverage**: Ensure all pages have translations for all supported locales

## Support

For issues or questions, refer to:
- next-intl documentation: https://next-intl-docs.vercel.app/
- Next.js i18n routing: https://nextjs.org/docs/app/building-your-application/routing/internationalization
