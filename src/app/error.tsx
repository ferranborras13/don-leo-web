"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-heading-xl text-text mb-4">Something went wrong</h1>
          <p className="text-body-md text-muted mb-6">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-2xl bg-accentCTA text-white px-8 py-4 text-heading-md font-medium transition-all hover:bg-accentPressed active:scale-95"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
