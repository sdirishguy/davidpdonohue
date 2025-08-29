'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BaseProps {
  className?: string
  children: ReactNode
}

// Individual heading components
export function H1({ className, children }: BaseProps) {
  return (
    <h1 className={cn('text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white', className)}>
      {children}
    </h1>
  )
}

export function H2({ className, children }: BaseProps) {
  return (
    <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white', className)}>
      {children}
    </h2>
  )
}

export function H3({ className, children }: BaseProps) {
  return (
    <h3 className={cn('text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white', className)}>
      {children}
    </h3>
  )
}

export function H4({ className, children }: BaseProps) {
  return (
    <h4 className={cn('text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white', className)}>
      {children}
    </h4>
  )
}

// Body text components
export function Body({ className, children }: BaseProps) {
  return (
    <p className={cn('text-base leading-relaxed text-slate-200', className)}>
      {children}
    </p>
  )
}

export function BodyLarge({ className, children }: BaseProps) {
  return (
    <p className={cn('text-lg leading-relaxed text-slate-200', className)}>
      {children}
    </p>
  )
}

export function BodySmall({ className, children }: BaseProps) {
  return (
    <p className={cn('text-sm leading-relaxed text-slate-200', className)}>
      {children}
    </p>
  )
}

// Special components
export function Title({ className, children }: BaseProps) {
  return (
    <h1 className={cn('text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent', className)}>
      {children}
    </h1>
  )
}

export function Subtitle({ className, children }: BaseProps) {
  return (
    <h2 className={cn('text-lg md:text-xl font-medium text-slate-300', className)}>
      {children}
    </h2>
  )
}

export function Lead({ className, children }: BaseProps) {
  return (
    <p className={cn('text-lg md:text-xl leading-relaxed font-light text-slate-200', className)}>
      {children}
    </p>
  )
}

export function Code({ className, children }: BaseProps) {
  return (
    <code className={cn('font-mono text-sm bg-primary-navy/80 px-2 py-1 rounded text-primary-blue', className)}>
      {children}
    </code>
  )
}

export function Caption({ className, children }: BaseProps) {
  return (
    <p className={cn('text-sm font-medium text-slate-300', className)}>
      {children}
    </p>
  )
}

export function Overline({ className, children }: BaseProps) {
  return (
    <p className={cn('text-xs font-semibold uppercase tracking-wider text-primary-blue', className)}>
      {children}
    </p>
  )
}

// Colored text variants
interface ColoredTextProps extends BaseProps {
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'white' | 'gradient'
}

export function Text({ color = 'secondary', className, children }: ColoredTextProps) {
  const colorClasses = {
    primary: 'text-primary-blue',
    secondary: 'text-slate-200',
    muted: 'text-slate-300',
    accent: 'text-primary-magenta',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    white: 'text-white',
    gradient: 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
  }
  
  return (
    <span className={cn(colorClasses[color], className)}>
      {children}
    </span>
  )
}

