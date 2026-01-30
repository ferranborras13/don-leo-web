import { getRequestConfig } from 'next-intl/server';

/**
 * next-intl configuration
 * Defines supported locales and default locale
 */
export const locales = ['en', 'es', 'it', 'fr', 'de'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  let validLocale: Locale = locale as Locale;
  if (!locales.includes(validLocale)) {
    validLocale = defaultLocale;
  }

  return {
    locale: validLocale,
    messages: (await import(`@/../messages/${validLocale}.json`)).default
  };
});
