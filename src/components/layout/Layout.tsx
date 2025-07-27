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
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {showHeader && <Header />}
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn('flex-1', className)}
      >
        {children}
      </motion.main>
      
      {showFooter && <Footer />}
    </div>
  )
}
