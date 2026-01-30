import React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface PastelTileProps {
  variant: "cream" | "pink" | "lavender" | "mint" | "ice"
  icon?: LucideIcon
  title: string
  description?: string
  onClick?: () => void
  interactive?: boolean
  selected?: boolean
  fullWidth?: boolean
  className?: string
}

export function PastelTile({
  variant,
  icon: Icon,
  title,
  description,
  onClick,
  interactive = true,
  selected = false,
  fullWidth = false,
  className,
}: PastelTileProps) {
  const variantStyles = {
    cream: "neon-card-rose",
    pink: "neon-card-violet",
    lavender: "neon-card-blue",
    mint: "neon-card-teal",
    ice: "neon-card-fuchsia",
  }

  // If not interactive, render as a div (not a button)
  if (!interactive) {
    return (
      <div
        className={cn(
          "relative rounded-3xl p-5 text-left",
          variantStyles[variant],
          fullWidth ? "col-span-2" : "",
          className
        )}
      >
        {Icon && (
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="text-heading-md mb-1">{title}</div>
        {description && (
          <div className="text-body-sm opacity-70">{description}</div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-3xl p-5 text-left transition-all",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variantStyles[variant],
        selected && "ring-2 ring-accent ring-offset-2 ring-offset-background",
        fullWidth ? "col-span-2" : "",
        className
      )}
    >
      {Icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="text-heading-md mb-1">{title}</div>
      {description && (
        <div className="text-body-sm opacity-70">{description}</div>
      )}
    </button>
  )
}
