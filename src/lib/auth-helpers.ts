import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  UserCredential,
  AuthError,
} from 'firebase/auth';
import { auth } from './firebase/client';
import {
  createUserProfile,
  getUserProfile,
  updateLastLogin,
  UserProfile,
} from './firestore-helpers';

/**
 * Sign up a new user with email and password
 * Creates both Firebase Auth user and Firestore profile
 * @param email - User email
 * @param password - User password (min 6 characters)
 * @param displayName - Optional display name
 * @returns The created user credential
 * @throws AuthError with code (e.g., 'auth/email-already-in-use', 'auth/weak-password')
 */
export async function signUp(
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create user profile in Firestore
    await createUserProfile(userCredential.user.uid, email, displayName);

    return userCredential;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Sign in an existing user with email and password
 * Updates lastLoginAt timestamp in Firestore
 * @param email - User email
 * @param password - User password
 * @returns The user credential
 * @throws AuthError with code (e.g., 'auth/user-not-found', 'auth/wrong-password')
 */
export async function signIn(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update last login timestamp in Firestore
    await updateLastLogin(userCredential.user.uid);

    return userCredential;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 * @throws Error if sign out fails
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Subscribe to auth state changes
 * @param callback - Called with user (null if signed out) when auth state changes
 * @returns Unsubscribe function
 */
export function onAuthStateChange(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get human-readable error message from Firebase Auth error code
 * @param error - Firebase Auth error
 * @returns User-friendly error message
 */
export function getAuthErrorMessage(error: unknown): string {
  const authError = error as AuthError;

  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
    'auth/requires-recent-login': 'Please sign in again to complete this action.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/api-key-not-valid': 'Invalid API key. You may be using the wrong Firebase config (Android/iOS instead of Web) or the wrong Firebase project.',
  };

  const code = authError.code || '';
  if (code in errorMessages) {
    return errorMessages[code];
  }

  // Default error message
  return authError.message || 'An authentication error occurred.';
}

/**
 * Get the current authenticated user
 * @returns Current user or null
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Force refresh the current user's token
 * @returns The user
 * @throws Error if no user is signed in or refresh fails
 */
export async function refreshUser(): Promise<User> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user is currently signed in.');
  }
  await user.getIdToken(true);
  return user;
}
