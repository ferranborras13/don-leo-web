import { Link as I18nLink } from '@/i18n/routing'
import { forwardRef } from 'react'

interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
  [key: string]: any
}

/**
 * Locale-aware Link component
 * Wraps next-intl's Link for consistent navigation
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <I18nLink href={href} className={className} ref={ref} {...props}>
        {children}
      </I18nLink>
    )
  }
)

Link.displayName = 'Link'
