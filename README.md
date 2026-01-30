# DonLeo - Your AI Dating Wingman

A modern Next.js web application for getting AI-powered dating advice and conversation starters. Built with React, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account with configured project

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
The `.env.local` file is already configured with your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC3t5gI8_pU1EWatIzKQv95zSzQDwYcAjI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=don-leo-7638a.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=don-leo-7638a
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=don-leo-7638a.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=464486950693
NEXT_PUBLIC_FIREBASE_APP_ID=1:464486950693:web:2f7d42b22e7d89f7bd75c2
```

3. **Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the application.

The server automatically uses port 3001 if port 3000 is in use.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Sign up page
│   ├── layout.tsx         # Root layout
│   └── app/               # Protected app routes
│       ├── page.tsx       # Dashboard
│       ├── profile/       # User profile
│       ├── rizz/          # Rizz/vibes page
│       └── wingman/       # Wingman chat interface
├── components/             # Reusable React components
│   ├── ui/                # UI components (PrimaryCTA, PasselTile)
│   ├── layout/            # Layout components (AppShell, Navigation)
│   └── chat/              # Chat components
├── contexts/              # React contexts
│   └── auth-context.tsx   # Authentication context
├── hooks/                 # Custom React hooks
│   └── use-mock-chat.ts   # Mock chat data hook
├── lib/                   # Utility functions
│   ├── firebase.ts        # Firebase configuration
│   ├── auth-helpers.ts    # Auth functions
│   ├── firestore-helpers.ts # Firestore functions
│   └── utils.ts           # General utilities
├── middleware.ts          # Next.js middleware
├── types/                 # TypeScript type definitions
└── globals.css            # Global styles
```

## 🎨 Design System

The app uses a custom dark-mode design system with:
- **Colors**: Dark backgrounds (#0a0a0a), pink accent (#f8518a)
- **Typography**: Heading and body text scales
- **Components**: Reusable UI components using Tailwind CSS
- **Animations**: Fade-in and slide-up transitions

### Color Palette
- `--background`: #0a0a0a (Dark)
- `--accent`: #f8518a (Pink)
- `--accentCTA`: #f8518a (Call-to-action)
- `--accentPressed`: #d63d6f (Pressed state)

## 🔐 Authentication

The app uses Firebase Authentication for:
- Email/password signup
- Email/password login
- User session persistence
- Auth state management via React Context

Protected routes (`/app/*`) require authentication and redirect to `/login` if not authenticated.

## 🗄️ Database

User profiles are stored in Firestore with the following structure:
```typescript
interface UserProfile {
  uid: string
  email: string
  displayName?: string
  isPremium: boolean
  subscription?: {
    plan: 'free' | 'premium'
    startDate: number
    endDate?: number
  }
  createdAt: number
  updatedAt: number
  lastLoginAt?: number
}
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📦 Technologies Used

- **Framework**: Next.js 14.2
- **UI Library**: React 18.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **State Management**: Zustand 5.0
- **Utility**: Clsx, Tailwind Merge

## 🚨 Key Features

1. **Landing Page**: Beautiful hero section with feature showcases
2. **Authentication**: Secure sign-up and sign-in with Firebase
3. **User Profiles**: Store and manage user information in Firestore
4. **Protected Routes**: Role-based access control for authenticated users
5. **Responsive Design**: Works on desktop, tablet, and mobile devices
6. **Dark Mode**: Modern dark theme throughout the app

## 📝 Environment Setup Notes

The project uses a custom Tailwind configuration (`tailwind.config.js`) that:
- Scans src files for class names
- Extends the theme with custom colors from CSS variables
- Provides typography scale (heading-xl through body-sm)
- Includes animation keyframes

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use, the dev server automatically uses port 3001. Check the console for the correct URL.

### Firebase Configuration Issues
Ensure all `NEXT_PUBLIC_FIREBASE_*` variables are set in `.env.local`. The app validates these on startup.

### Build Errors
Clear the `.next` folder and reinstall dependencies:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📄 License

Copyright © 2025 DonLeo. All rights reserved.
