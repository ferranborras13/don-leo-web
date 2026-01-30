'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  signUp,
  signIn,
  signOut,
  onAuthStateChange,
  getAuthErrorMessage,
} from '@/lib/auth-helpers';
import { getUserProfile, UserProfile } from '@/lib/firestore-helpers';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchProfile = async (uid: string) => {
    try {
      const userProfile = await getUserProfile(uid);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Refresh profile (useful after updates)
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.uid);
    }
  };

  // Sign up wrapper
  const handleSignUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    await signUp(email, password, displayName);
    // Auth state change listener will handle setting user/profile
  };

  // Sign in wrapper
  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    // Auth state change listener will handle setting user/profile
  };

  // Sign out wrapper
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);

      if (user) {
        // Fetch user profile from Firestore
        await fetchProfile(user.uid);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { getAuthErrorMessage };
