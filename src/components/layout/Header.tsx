'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

// Updated navigation with Personal instead of About and reordered items
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Personal', href: '/about' },
  { name: 'Professional', href: '/professional' },
  { name: 'Projects', href: '/projects' },
  { name: 'Content', href: '/content' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://www.github.com/sdirishguy', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/davidpatrickdonohue', icon: Linkedin },
  { name: 'Email', href: 'mailto:david@davidpdonohue.com', icon: Mail },
  { name: 'Resume', href: '/2025CurrentResume-DavidDonohue.pdf', icon: FileText },
]

export default function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b transition-all duration-300',
      isScrolled 
        ? 'border-primary-blue/20 bg-primary-navy/95 backdrop-blur-sm' 
        : 'border-transparent bg-primary-navy/80 backdrop-blur-sm',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link 
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#22D3EE] via-[#FD5E53] to-[#FFEB3B] bg-clip-text text-transparent hover:from-[#22D3EE]/90 hover:via-[#FD5E53]/90 hover:to-[#FFEB3B]/90 transition-all duration-300"
            >
              David P. Donohue
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex space-x-8"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'font-medium transition-colors relative',
                    isActive(item.href)
                      ? 'text-primary-blue'
                      : 'text-slate-200 hover:text-primary-blue'
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </motion.div>
          </nav>

          {/* Desktop Social Links & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center space-x-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-primary-blue transition-colors"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
            <Link href="/contact">
              <Button variant="outline" size="sm" className="ml-4">
                Get In Touch
              </Button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-primary-blue/20 bg-primary-navy/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 font-medium transition-colors',
                        isActive(item.href)
                          ? 'text-primary-blue'
                          : 'text-slate-200 hover:text-primary-blue'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between pt-4 border-t border-primary-blue/20"
              >
                <div className="flex space-x-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-slate-300 hover:text-primary-blue transition-colors"
                        aria-label={link.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

