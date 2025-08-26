import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

// TypeScript interfaces
interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
type CardContentProps = React.HTMLAttributes<HTMLDivElement>
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

// Main Card component
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    
    const variants = {
      default: 'bg-primary-navy/80/50 backdrop-blur-sm',
      elevated: 'bg-primary-navy/80/80 backdrop-blur-sm shadow-xl shadow-slate-900/20',
      bordered: 'bg-primary-navy/80/30 backdrop-blur-sm border border-primary-blue/30'
    }
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-xl',
          variants[variant],
          paddings[padding],
          hover && 'hover:bg-primary-navy/80/70 transition-colors cursor-pointer',
          className
        )}
        whileHover={hover ? { y: -2 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

// Card sub-components
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-slate-200', className)}
      {...props}
    />
  )
)

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)

// Set display names for debugging
Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
export default Card

