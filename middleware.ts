import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

/**
 * Middleware configuration for locale routing
 * Uses next-intl's createMiddleware with our routing configuration
 */

// Create the next-intl middleware using the routing configuration
const intlMiddleware = createMiddleware(routing);

export function middleware(request: any) {
  return intlMiddleware(request);
}

export const config = {
  // Matcher for all paths except static files and API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
