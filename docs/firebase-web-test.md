# Firebase Web Integration Test Checklist

This document provides a manual test checklist for verifying the Firebase Auth + Firestore integration.

## Setup

Before testing, ensure:
1. Firebase environment variables are set in `.env.local`
2. **IMPORTANT:** After editing `.env.local`, you MUST restart the dev server (`npm run dev`) for the changes to take effect
3. Access the app at `http://localhost:3000`

### Troubleshooting Firebase Config Issues

If you see an error like "auth/api-key-not-valid", check the browser console for diagnostic logs:

```
[Firebase] Environment variables check:
  NEXT_PUBLIC_FIREBASE_API_KEY: true 39 chars
  ...
```

- If you see `false` or `0 chars` for any variable, the env var is not being read. Restart the dev server.
- If you see the correct values but still get API key errors, verify the API key in Firebase Console matches your `.env.local`

---

## Test Cases

### 1. Signup Flow

**Steps:**
1. Navigate to `http://localhost:3000/signup`
2. Enter a valid email (e.g., `test@example.com`)
3. Enter a password (minimum 6 characters)
4. Enter a name
5. Accept terms and conditions
6. Click "Start with DonLeo"

**Expected Results:**
- Account is created in Firebase Auth
- User profile document is created in Firestore at `users/{uid}`
- Profile contains: `uid`, `email`, `displayName`, `isPremium: false`, `createdAt`, `updatedAt`, `lastLoginAt`
- User is redirected to `/app/rizz`
- User can navigate to all `/app/*` routes

**To Verify Firestore:**
```javascript
// In browser console after login:
import { doc, getDoc, getFirestore } from 'firebase/firestore';
const db = getFirestore();
const user = JSON.parse(localStorage.getItem('user')); // or use auth context
const profile = await getDoc(doc(db, 'users', user.uid));
console.log(profile.data());
// Should see: { uid, email, displayName, isPremium: false, createdAt, updatedAt, lastLoginAt }
```

---

### 2. Login Flow

**Steps:**
1. Navigate to `http://localhost:3000/login`
2. Enter the email used during signup
3. Enter the password used during signup
4. Click "Sign in"

**Expected Results:**
- User is authenticated
- `lastLoginAt` timestamp is updated in Firestore
- User is redirected to `/app/rizz`
- User can navigate to all `/app/*` routes

**To Verify lastLoginAt Update:**
```javascript
// Compare before and after login values in Firestore console
```

---

### 3. Logout Flow

**Steps:**
1. While logged in, navigate to `/app/profile`
2. Click "Log out" button

**Expected Results:**
- User is signed out from Firebase Auth
- User is redirected to `/login`
- Accessing `/app/*` routes redirects back to `/login`

---

### 4. Session Persistence

**Steps:**
1. Sign in with valid credentials
2. Navigate to `/app/rizz`
3. Refresh the browser page (Cmd+R / F5)
4. Close and reopen the browser tab

**Expected Results:**
- User remains logged in after refresh
- User remains logged in after tab close/reopen
- User can still access all `/app/*` routes
- User profile is accessible from the AuthContext

---

### 5. Protected Routes

**Steps:**
1. Log out (or use incognito/private window)
2. Navigate directly to `http://localhost:3000/app`
3. Navigate directly to `http://localhost:3000/app/rizz`
4. Navigate directly to `http://localhost://3000/app/profile`

**Expected Results:**
- All `/app/*` routes redirect to `/login`
- No protected content is visible without authentication

---

### 6. Auth Redirect (Already Logged In)

**Steps:**
1. Log in with valid credentials
2. Navigate to `http://localhost:3000/login`
3. Navigate to `http://localhost:3000/signup`

**Expected Results:**
- User is automatically redirected to `/app`
- Login/signup forms are not shown when already authenticated

---

### 7. Error Handling - Invalid Credentials

**Steps:**
1. Navigate to `http://localhost:3000/login`
2. Enter a valid email
3. Enter an incorrect password
4. Click "Sign in"

**Expected Results:**
- Error message is displayed: "Invalid email or password" or similar
- User remains on login page
- No redirect occurs

---

### 8. Error Handling - User Already Exists

**Steps:**
1. Navigate to `http://localhost:3000/signup`
2. Enter an email that already exists
3. Enter any password
4. Click "Start with DonLeo"

**Expected Results:**
- Error message is displayed: "An account with this email already exists"
- User remains on signup page
- No redirect occurs

---

### 9. Error Handling - Weak Password

**Steps:**
1. Navigate to `http://localhost:3000/signup`
2. Enter a new email
3. Enter a password with less than 6 characters
4. Click "Start with DonLeo"

**Expected Results:**
- Browser validation prevents submission (HTML5 `minLength="6"`)
- Or Firebase error: "Password should be at least 6 characters"

---

### 10. Error Handling - Invalid Email

**Steps:**
1. Navigate to `http://localhost:3000/signup` or `/login`
2. Enter an invalid email format
3. Click submit

**Expected Results:**
- Browser validation prevents submission (HTML5 `type="email"`)
- Or Firebase error: "Invalid email address"

---

## Firestore Data Verification

After signup, verify the Firestore document structure:

**Document Path:** `users/{uid}`

**Expected Fields:**
```javascript
{
  uid: "string (Firebase Auth UID)",
  email: "string (user email)",
  displayName: "string (name from signup or email prefix)",
  isPremium: false,
  createdAt: 1234567890 (timestamp in ms),
  updatedAt: 1234567890 (timestamp in ms),
  lastLoginAt: 1234567890 (timestamp in ms)
}
```

---

## Cross-Platform Verification (Optional)

If you have the mobile app:
1. Sign up on web → Check if profile appears in mobile app
2. Sign up on mobile → Try logging in on web

---

## Common Issues & Fixes

### Issue: "Missing Firebase environment variable"
**Fix:** Ensure `.env.local` exists with all required `NEXT_PUBLIC_FIREBASE_*` variables

### Issue: "Permission denied" in Firestore
**Fix:** Check Firestore Security Rules allow authenticated users to read/write their own profile

### Issue: Session not persisting
**Fix:** Firebase Auth uses localStorage/indexedDB. Ensure browser doesn't block storage.

### Issue: Build errors
**Fix:** Run `npm run build` to check for TypeScript errors

---

## Success Criteria

All test cases should pass:
- ✅ Signup creates Firebase Auth user + Firestore profile
- ✅ Login works with correct credentials
- ✅ Logout clears session
- ✅ Session persists on refresh
- ✅ Protected routes redirect to login when unauthenticated
- ✅ Authenticated users are redirected from login/signup to app
- ✅ Error messages display for invalid credentials, existing users, weak passwords
- ✅ Firestore profile data structure matches specification
