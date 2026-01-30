import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase/client';

// User profile interface matching the mobile app structure
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  isPremium: boolean;
  subscription?: {
    plan: 'free' | 'premium';
    startDate: number;
    endDate?: number;
  };
  createdAt: number;
  updatedAt: number;
  lastLoginAt?: number;
}

/**
 * Get user profile from Firestore
 * @param uid - User ID
 * @returns User profile or null if not found
 */
export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Create user profile in Firestore
 * Called after successful signup
 * Uses serverTimestamp for accurate timestamps
 * @param uid - User ID from Firebase Auth
 * @param email - User email
 * @param displayName - Optional display name
 */
export async function createUserProfile(
  uid: string,
  email: string,
  displayName?: string
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    const now = Date.now();

    await setDoc(userRef, {
      uid,
      email,
      displayName: displayName || email.split('@')[0], // Default to email prefix if no displayName
      isPremium: false,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    }, { merge: true }); // Use merge to preserve existing fields if user already exists

    console.log('[Firestore] User profile created/merged for:', uid);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Update user's lastLoginAt timestamp
 * Called after successful login
 * @param uid - User ID
 */
export async function updateLastLogin(uid: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      lastLoginAt: Date.now(),
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error('Error updating last login:', error);
    throw error;
  }
}

/**
 * Update user profile data
 * @param uid - User ID
 * @param updates - Partial user profile updates
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<Omit<UserProfile, 'uid' | 'email' | 'createdAt'>>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Query user by email (for admin/debug purposes)
 * @param email - User email to search for
 * @returns User profile or null if not found
 */
export async function findUserByEmail(
  email: string
): Promise<UserProfile | null> {
  try {
    const { collection, query, where, getDocs } = await import('firebase/firestore');
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as UserProfile;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

/**
 * Delete user profile (for account deletion)
 * @param uid - User ID
 */
export async function deleteUserProfile(uid: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
    console.log('[Firestore] User profile deleted for:', uid);
  } catch (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
}
