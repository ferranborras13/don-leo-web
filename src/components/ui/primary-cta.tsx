import React from "react"
import { cn } from "@/lib/utils"

interface PrimaryCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "large"
  isLoading?: boolean
}

export function PrimaryCTA({
  children,
  variant = "primary",
  size = "default",
  isLoading = false,
  className,
  disabled,
  ...props
}: PrimaryCTAProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-95",
        variant === "primary" && [
          "bg-accentCTA text-white",
          "hover:bg-accentPressed",
        ],
        variant === "secondary" && [
          "bg-surface2 text-text",
          "hover:bg-surface",
          "border border-cardBorder",
        ],
        size === "default" && "px-6 py-3 text-body-lg",
        size === "large" && "px-8 py-4 text-heading-md",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
