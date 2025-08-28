'use client'

import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  showHeader?: boolean
  showFooter?: boolean
}

export default function Layout({ 
  children, 
  className,
  showHeader = true,
  showFooter = true 
}: LayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col bg-primary-navy text-slate-100', className)}>
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50
                   focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      {showHeader && (
        <header role="banner">
          <Header />
        </header>
      )}

      <motion.main
        id="main"
        role="main"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {showFooter && (
        <footer role="contentinfo">
          <Footer />
        </footer>
      )}
    </div>
  )
}

