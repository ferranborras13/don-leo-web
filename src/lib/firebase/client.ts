"use client"

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

// The expected Firebase project for this app (shared with mobile)
const EXPECTED_FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '';

/**
 * Sanitize environment variable value
 * - Trims whitespace
 * - Removes surrounding quotes if present (single or double)
 */
function sanitizeEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  let sanitized = value.trim();
  // Remove surrounding quotes if present
  if ((sanitized.startsWith('"') && sanitized.endsWith('"')) ||
      (sanitized.startsWith("'") && sanitized.endsWith("'"))) {
    sanitized = sanitized.slice(1, -1);
  }
  return sanitized;
}

/**
 * Get Firebase configuration from environment variables with sanitization
 */
function getFirebaseConfig() {
  const rawConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Sanitize all values
  const config = {
    apiKey: sanitizeEnv(rawConfig.apiKey),
    authDomain: sanitizeEnv(rawConfig.authDomain),
    projectId: sanitizeEnv(rawConfig.projectId),
    storageBucket: sanitizeEnv(rawConfig.storageBucket),
    messagingSenderId: sanitizeEnv(rawConfig.messagingSenderId),
    appId: sanitizeEnv(rawConfig.appId),
  };

  return config;
}

// Get sanitized config (cached)
let _cachedConfig: ReturnType<typeof getFirebaseConfig> | null = null;
function getCachedConfig() {
  if (!_cachedConfig) {
    _cachedConfig = getFirebaseConfig();
  }
  return _cachedConfig;
}

/**
 * Validate Firebase configuration and provide clear error messages
 */
function validateFirebaseConfig(config: ReturnType<typeof getFirebaseConfig>): void {
  const requiredFields: Array<keyof typeof config> = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missing: string[] = [];
  for (const field of requiredFields) {
    if (!config[field]) {
      // Convert camelCase to SCREAMING_SNAKE_CASE for env var name
      const envVarName = `NEXT_PUBLIC_FIREBASE_${field
        .replace(/([A-Z])/g, '_$1')
        .toUpperCase()}`;
      missing.push(envVarName);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required Firebase environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\n` +
      `Please add these to your .env.local file and restart the dev server.\n` +
      `Get your Web App config from Firebase Console → Project Settings → Your apps → Web app.`
    );
  }

  // Check for Android/iOS config mistakes (common API key pattern)
  if (config.apiKey) {
    // Android keys often start with "AIza" (old format) or "AAAA"
    // iOS keys often start with specific patterns
    // Web keys from Firebase Console typically start with "AIza" followed by 36+ chars
    const isLikelyWrongFormat =
      config.apiKey.startsWith('AAAA') ||
      config.apiKey === 'YOUR_API_KEY';

    if (isLikelyWrongFormat) {
      console.error(
        '[Firebase] WARNING: The API key appears to be invalid placeholder or wrong platform.\n' +
        'Android/iOS keys will NOT work for web.\n' +
        'Copy the WEB APP config from Firebase Console (Project Settings → Your apps → Web app).'
      );
    }
  }

  // Check for project mismatch
  if (config.projectId && EXPECTED_FIREBASE_PROJECT_ID) {
    if (config.projectId !== EXPECTED_FIREBASE_PROJECT_ID) {
      console.error(
        `[Firebase] CRITICAL: Project ID mismatch!\n` +
        `  Expected: ${EXPECTED_FIREBASE_PROJECT_ID}\n` +
        `  Found: ${config.projectId}\n\n` +
        `You are NOT using the shared mobile+web Firebase project.\n` +
        `Update NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local to match your mobile app's project.`
      );
    }
  }

  // Check if authDomain contains projectId (common mistake)
  if (config.authDomain && config.projectId) {
    if (!config.authDomain.includes(config.projectId)) {
      console.warn(
        `[Firebase] WARNING: authDomain "${config.authDomain}" does not contain projectId "${config.projectId}".\n` +
        `This may indicate you're using the wrong Firebase project's config.`
      );
    }
  }
}

// Diagnostics (dev only, safe - never logs secrets)
function logDiagnostics(config: ReturnType<typeof getFirebaseConfig>) {
  if (process.env.NODE_ENV !== 'development') return;

  console.log('[Firebase] Configuration Check:');
  console.log('  projectId:', config.projectId);
  console.log('  authDomain:', config.authDomain);
  console.log('  apiKey length:', config.apiKey?.length || 0, 'chars');

  // Log masked API key (first 4 and last 4 chars)
  if (config.apiKey && config.apiKey.length >= 8) {
    const first4 = config.apiKey.substring(0, 4);
    const last4 = config.apiKey.slice(-4);
    console.log('  apiKey (masked):', `${first4}...${last4}`);
  } else {
    console.log('  apiKey: MISSING OR TOO SHORT');
  }
  console.log('  messagingSenderId:', config.messagingSenderId);
  console.log('  appId:', config.appId?.substring(0, 20) + '...');
}

// Singleton instances
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

/**
 * Initialize or get existing Firebase app instance
 */
function getOrInitializeApp(): FirebaseApp {
  if (_app) {
    return _app;
  }

  const config = getCachedConfig();

  // Log diagnostics in dev mode
  logDiagnostics(config);

  // Validate configuration
  validateFirebaseConfig(config);

  // Check for existing Firebase apps
  const existingApps = getApps();
  if (existingApps.length > 0) {
    console.warn('[Firebase] Found existing Firebase app instance. Reusing it.');
    _app = existingApps[0];
    return _app;
  }

  console.log('[Firebase] Initializing Firebase app for project:', config.projectId);
  _app = initializeApp(config);
  return _app;
}

/**
 * Get Firebase app instance (singleton)
 */
export function getFirebaseApp(): FirebaseApp {
  return getOrInitializeApp();
}

/**
 * Get Firebase Auth instance (singleton)
 */
export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getOrInitializeApp());
    if (process.env.NODE_ENV === 'development') {
      console.log('[Firebase] Auth instance created');
    }
  }
  return _auth;
}

/**
 * Get Firestore instance (singleton)
 */
export function getFirebaseDB(): Firestore {
  if (!_db) {
    _db = getFirestore(getOrInitializeApp());
    if (process.env.NODE_ENV === 'development') {
      console.log('[Firebase] Firestore instance created');
    }
  }
  return _db;
}

/**
 * Get Firebase Storage instance (singleton)
 */
export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) {
    _storage = getStorage(getOrInitializeApp());
    if (process.env.NODE_ENV === 'development') {
      console.log('[Firebase] Storage instance created');
    }
  }
  return _storage;
}

/**
 * Export all Firebase services as a single object
 */
export const services: FirebaseServices = {
  get app(): FirebaseApp { return getOrInitializeApp(); },
  get auth(): Auth { return getFirebaseAuth(); },
  get db(): Firestore { return getFirebaseDB(); },
  get storage(): FirebaseStorage { return getFirebaseStorage(); },
};

// Backwards-compatible named exports (lazy initialization via Proxy)
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

export const auth = new Proxy({} as Auth, {
  get(target, prop) {
    if (!authInstance) {
      authInstance = getFirebaseAuth();
    }
    return authInstance[prop as keyof Auth];
  },
  set(target, prop, value) {
    if (authInstance) {
      (authInstance as any)[prop] = value;
    }
    return true;
  },
  has(target, prop) {
    return prop in getFirebaseAuth();
  },
  ownKeys() {
    return Object.keys(getFirebaseAuth());
  },
});

export const db = new Proxy({} as Firestore, {
  get(target, prop) {
    if (!dbInstance) {
      dbInstance = getFirebaseDB();
    }
    return dbInstance[prop as keyof Firestore];
  },
  set(target, prop, value) {
    if (dbInstance) {
      (dbInstance as any)[prop] = value;
    }
    return true;
  },
  has(target, prop) {
    return prop in getFirebaseDB();
  },
  ownKeys() {
    return Object.keys(getFirebaseDB());
  },
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(target, prop) {
    if (!storageInstance) {
      storageInstance = getFirebaseStorage();
    }
    return storageInstance[prop as keyof FirebaseStorage];
  },
  set(target, prop, value) {
    if (storageInstance) {
      (storageInstance as any)[prop] = value;
    }
    return true;
  },
});

export default getFirebaseApp();
