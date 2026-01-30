# Firebase Web App Setup Guide

## Overview

This guide will help you connect your website to the same Firebase project used by the Don Tulio mobile app. The Firebase project is already configured with Authentication (Email/Password) and Firestore database.

**Firebase Project Details:**
- Project ID: `don-leo-7638a`
- Auth Domain: `don-leo-7638a.firebaseapp.com`
- Storage Bucket: `don-leo-7638a.appspot.com`

---

## Prerequisites

- Node.js 14+ (for build tools)
- npm or yarn
- A Firebase account (you can use an existing Firebase Console login)
- Your website codebase (React, Vue, Angular, or vanilla JS)

---

## Step 1: Get Firebase Config Values

Your Firebase credentials are already set up. Here are the values to use:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC3t5gI8_pU1EWatIzKQv95zSzQDwYcAjI",
  authDomain: "don-leo-7638a.firebaseapp.com",
  projectId: "don-leo-7638a",
  storageBucket: "don-leo-7638a.appspot.com",
  messagingSenderId: "464486950693",
  appId: "1:464486950693:web:2f7d42b22e7d89f7bd75c2"
};
```

**Note:** The `apiKey` is public and safe to expose in frontend code (it only allows operations permitted by Firestore Security Rules).

---

## Step 2: Install Firebase SDK

Install the Firebase JavaScript SDK:

```bash
npm install firebase
# or
yarn add firebase
```

---

## Step 3: Initialize Firebase in Your Web App

Create a file (e.g., `src/firebase.js` or `src/lib/firebase.ts`):

### For Vanilla JavaScript

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3t5gI8_pU1EWatIzKQv95zSzQDwYcAjI",
  authDomain: "don-leo-7638a.firebaseapp.com",
  projectId: "don-leo-7638a",
  storageBucket: "don-leo-7638a.appspot.com",
  messagingSenderId: "464486950693",
  appId: "1:464486950693:web:2f7d42b22e7d89f7bd75c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
```

### For React (TypeScript)

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface FirebaseServices {
  auth: Auth;
  db: Firestore;
}

const firebaseConfig = {
  apiKey: "AIzaSyC3t5gI8_pU1EWatIzKQv95zSzQDwYcAjI",
  authDomain: "don-leo-7638a.firebaseapp.com",
  projectId: "don-leo-7638a",
  storageBucket: "don-leo-7638a.appspot.com",
  messagingSenderId: "464486950693",
  appId: "1:464486950693:web:2f7d42b22e7d89f7bd75c2"
};

const app = initializeApp(firebaseConfig);

export const services: FirebaseServices = {
  auth: getAuth(app),
  db: getFirestore(app),
};

export default app;
```

---

## Step 4: Use Firebase Authentication

### Sign Up Example

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Sign up error:', error.message);
    throw error;
  }
}
```

### Sign In Example

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error.message);
    throw error;
  }
}
```

### Sign Out Example

```javascript
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

async function logout() {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error.message);
  }
}
```

---

## Step 5: Use Firestore Database

The mobile app stores user profiles in Firestore at `/users/{uid}` with this structure:

```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  isPremium: boolean;
  subscription?: {
    plan: 'free' | 'premium';
    startDate: number;
    endDate?: number;
  };
  createdAt: number;
  updatedAt: number;
}
```

### Read User Profile Example

```javascript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

async function getUserProfile(uid) {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      console.log('User profile:', userDoc.data());
      return userDoc.data();
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}
```

### Create/Update User Profile Example

```javascript
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

async function createUserProfile(uid, email, displayName) {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      uid,
      email,
      displayName,
      isPremium: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    console.log('User profile created');
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}
```

---

## Step 6: Environment Variables (Optional but Recommended)

Create a `.env` file:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyC3t5gI8_pU1EWatIzKQv95zSzQDwYcAjI
REACT_APP_FIREBASE_AUTH_DOMAIN=don-leo-7638a.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=don-leo-7638a
REACT_APP_FIREBASE_STORAGE_BUCKET=don-leo-7638a.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=464486950693
REACT_APP_FIREBASE_APP_ID=1:464486950693:web:2f7d42b22e7d89f7bd75c2
```

Then update your firebase initialization:

```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
```

---

## Step 7: Authentication State Management

Monitor auth state changes:

```javascript
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('User logged in:', user.uid);
    // Fetch user profile from Firestore
    // Redirect to dashboard
  } else {
    console.log('User logged out');
    // Redirect to login
  }
});
```

---

## Step 8: Common Tasks

### Get Current User

```javascript
import { auth } from './firebase';

const user = auth.currentUser;
if (user) {
  console.log('Current user:', user.uid, user.email);
} else {
  console.log('No user logged in');
}
```

### Update User Profile Data

```javascript
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

async function updateUserProfile(uid, updates) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Date.now(),
    });
    console.log('User profile updated');
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
```

### Query Users

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

async function findUserByEmail(email) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log('No user found');
      return null;
    }
    
    return snapshot.docs[0].data();
  } catch (error) {
    console.error('Error querying users:', error);
    throw error;
  }
}
```

---

## Step 9: Firestore Security Rules

The Firestore database currently has security rules configured to:
- Allow users to read/write their own profile at `/users/{uid}`
- Prevent access to other users' data

If you need to modify these rules, go to:
1. Firebase Console → Project → Firestore Database → Rules
2. Current rules prioritize user privacy and security

---

## Step 10: Testing

Test the connection in your browser console:

```javascript
// Test Authentication
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

signInWithEmailAndPassword(auth, 'test@example.com', 'password123')
  .then(user => console.log('Auth works:', user))
  .catch(err => console.error('Auth error:', err));

// Test Firestore
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

getDocs(collection(db, 'users'))
  .then(snapshot => console.log('Firestore works:', snapshot.size, 'users'))
  .catch(err => console.error('Firestore error:', err));
```

---

## Troubleshooting

### "apiKey is invalid" Error

**Solution:** Make sure you're using the correct API key from the `.env` file. Don't include extra spaces or quotes.

### "CORS Error"

**Solution:** CORS errors usually mean Firestore is rejecting the request. Check:
1. Firestore Security Rules allow the operation
2. Your domain is not blocked (it shouldn't be by default)

### "User not found in Firestore"

**Solution:** When users sign up via the mobile app or API, their profile is created automatically in Firestore at `/users/{uid}`. On web, you may need to manually create the profile after signup:

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

async function signUp(email, password, displayName) {
  try {
    // Create user in Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    // Create profile in Firestore
    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
      displayName,
      isPremium: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return userCredential.user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}
```

### "Permission Denied" Error

**Solution:** This means your Firestore Security Rules are denying access. Common causes:
1. User is not authenticated (call `signIn` or `signUp` first)
2. Trying to access another user's data
3. Rules are too restrictive

---

## Next Steps

1. **Integrate Auth UI:** Use Firebase UI or build your own login/signup forms
2. **Add User Context:** Create a React Context or state management for logged-in user
3. **Sync Data:** Optionally sync web user data with the mobile app
4. **Test Cross-Platform:** Sign up on web, verify profile shows on mobile (and vice versa)

---

## Support & Resources

- **Firebase Docs:** https://firebase.google.com/docs/web/setup
- **Firestore Guide:** https://firebase.google.com/docs/firestore
- **Auth Guide:** https://firebase.google.com/docs/auth/web/start
- **Security Rules:** https://firebase.google.com/docs/firestore/security/get-started

---

## Summary

Your Firebase project (`don-leo-7638a`) is ready to use on your website. Follow the steps above to:
1. ✅ Install Firebase SDK
2. ✅ Initialize with provided credentials
3. ✅ Implement authentication (signup/signin/logout)
4. ✅ Read/write user profiles in Firestore
5. ✅ Share user data across web and mobile platforms

Both your mobile app and website will access the same users and data in Firestore!
