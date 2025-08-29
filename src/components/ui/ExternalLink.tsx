'use client'

import React from 'react'
import { openSecureLink } from '@/lib/secure-link-util'
import { cn } from '@/lib/utils'

type Props = React.PropsWithChildren<{
  href: string
  className?: string
  'data-testid'?: string
  ariaLabel?: string
}>

export default function ExternalLink({ href, className, children, ariaLabel, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer external"
      aria-label={ariaLabel}
      className={cn(
        'underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring',
        className,
      )}
      onClick={(e) => {
        e.preventDefault()
        openSecureLink(href)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
