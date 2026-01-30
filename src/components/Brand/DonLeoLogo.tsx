"use client"

import { Link } from '@/i18n/routing'
import Image from "next/image"
import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg" | "xl"

interface DonLeoLogoProps {
  size?: Size
  className?: string
  priority?: boolean
  href?: string
  alt?: string
  locale?: string
}

const sizeConfig: Record<Size, string> = {
  sm: "w-[108px]",
  md: "w-[170px] md:w-[190px]",
  lg: "w-[220px] md:w-[250px]",
  xl: "w-[140px] md:w-[180px]",
}

export function DonLeoLogo({
  size = "md",
  className,
  priority = false,
  href,
  alt = "DonLeo",
  locale,
}: DonLeoLogoProps) {
  const logoImage = (
    <Image
      src="/brand/donleo-logo.png"
      alt={alt}
      width={180}
      height={60}
      priority={priority}
      className={cn(sizeConfig[size], "h-auto")}
    />
  )

  if (href) {
    return (
      <Link href={href} locale={locale} className={cn("inline-flex", className)}>
        {logoImage}
      </Link>
    )
  }

  return <>{logoImage}</>
}
