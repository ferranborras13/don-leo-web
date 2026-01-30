# CRITICAL: Clear Next.js Build Cache

The language switcher is correctly configured, but the old duplicate middleware 
is still cached in the .next directory, causing 404 errors.

## YOU MUST RUN THESE COMMANDS:

```bash
# 1. Stop the dev server
# Press Ctrl+C in the terminal where npm run dev is running

# 2. Remove the build cache
rm -rf .next

# 3. Restart the dev server
npm run dev

# 4. Hard refresh your browser
# Mac: Cmd+Shift+R
# Windows: Ctrl+Shift+R
```

## Why This Is Necessary

- We deleted `src/middleware.ts` (duplicate middleware)
- But Next.js cached the old middleware in `.next` directory
- The cached middleware is still routing incorrectly
- Only way to fix is to clear the cache and restart

## After Clearing Cache

Test these URLs:
- http://localhost:3000/en
- http://localhost:3000/es
- http://localhost:3000/it
- http://localhost:3000/fr
- http://localhost:3000/de
- http://localhost:3000/en/app
- http://localhost:3000/es/app

All should load without 404 errors.
