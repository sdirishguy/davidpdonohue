// src/components/ui/AccessibleButton.tsx
import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AccessibleButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ariaLabel?: string
  ariaDescribedBy?: string
  loadingText?: string
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ariaLabel,
    ariaDescribedBy,
    loadingText = 'Loading',
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bg-primary-blue hover:bg-primary-blue/90 text-slate-900 shadow-lg shadow-cyan-500/25 focus:ring-primary-blue',
      secondary: 'bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500',
      outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-slate-900 focus:ring-primary-blue',
      ghost: 'text-primary-blue hover:bg-primary-blue/10 focus:ring-primary-blue'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles with improved focus indicators
          'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Enhanced focus styles for accessibility
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={isLoading}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {isLoading ? (
          <>
            <div 
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" 
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">{loadingText}...</span>
            {loadingText}...
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'

export default AccessibleButton

// src/components/layout/SkipLinks.tsx
export function SkipLinks() {
  return (
    <nav className="sr-only focus-within:not-sr-only">
      <ul className="fixed top-0 left-0 z-50 bg-primary-navy p-4 space-y-2">
        <li>
          <a
            href="#main-content"
            className="block px-4 py-2 bg-primary-blue text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            Skip to main content
          </a>
        </li>
        <li>
          <a
            href="#navigation"
            className="block px-4 py-2 bg-primary-blue text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            Skip to navigation
          </a>
        </li>
      </ul>
    </nav>
  )
}

// src/components/ui/TerminalAccessible.tsx - Improved terminal with accessibility
import React, { useRef, useEffect } from 'react';

interface AccessibleTerminalHeaderProps {
  terminalPath: string;
  isAnimationComplete: boolean;
  onSkip: () => void;
  onReplay: () => void;
}

export const AccessibleTerminalHeader: React.FC<AccessibleTerminalHeaderProps> = ({
  terminalPath,
  isAnimationComplete,
  onSkip,
  onReplay,
}) => {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Announce animation state changes to screen readers
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = isAnimationComplete 
        ? 'Animation completed' 
        : 'Animation in progress';
    }
  }, [isAnimationComplete]);

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div 
        ref={liveRegionRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />
      
      <header className="flex items-center justify-between mb-4 border-b border-primary-blue/20 pb-2">
        <div className="text-primary-blue/70 font-mono text-sm">
          <span className="sr-only">Terminal path: </span>
          terminal@davidpdonohue.com:{terminalPath}$
        </div>
        
        <div className="flex items-center gap-4">
          {/* Decorative elements with proper ARIA */}
          <div className="flex gap-2" role="img" aria-label="Window controls">
            <div className="w-3 h-3 rounded-full bg-red-500" aria-label="Close"></div>
            <div className="w-3 h-3 rounded-full bg-primary-sunset-orange" aria-label="Minimize"></div>
            <div className="w-3 h-3 rounded-full bg-green-500" aria-label="Maximize"></div>
          </div>
          
          {/* Animation controls */}
          <div className="flex gap-2" role="group" aria-label="Animation controls">
            {!isAnimationComplete && (
              <AccessibleButton
                onClick={onSkip}
                variant="outline"
                size="sm"
                ariaLabel="Skip typing animation"
                className="text-xs font-mono"
              >
                ⏭️ Skip
              </AccessibleButton>
            )}
            {isAnimationComplete && (
              <AccessibleButton
                onClick={onReplay}
                variant="outline"
                size="sm"
                ariaLabel="Replay typing animation"
                className="text-xs font-mono"
              >
                🔄 Replay
              </AccessibleButton>
            )}
          </div>
        </div>
      </header>
    </>
  );
};