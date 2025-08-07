'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

const socialLinks = [
  { name: 'GitHub', href: 'https://www.github.com/sdirishguy', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/davidpatrickdonohue', icon: Linkedin },
  { name: 'Email', href: 'mailto:david@davidpdonohue.com', icon: Mail },
]

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Personal', href: '/about' },
  { name: 'Professional', href: '/professional' },
  { name: 'Projects', href: '/projects' },
  { name: 'Content', href: '/content' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('bg-primary-navy border-t border-primary-blue/20', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-primary-blue mb-2">David P. Donohue</h3>
            <p className="text-slate-300 text-sm max-w-sm">
              Full-stack developer passionate about creating beautiful, functional web applications.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-primary-blue transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex space-x-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-300 hover:text-primary-blue transition-colors"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-4 border-t border-primary-blue/20 flex flex-col sm:flex-row justify-between items-center gap-2"
        >
          <p className="text-slate-300 text-xs">
            © {currentYear} DavidPDonohue.com. All rights reserved.
          </p>
          <div className="flex items-center text-slate-300 text-xs">
            <span>Made with</span>
            <Heart className="w-3 h-3 mx-1 text-red-400" />
            <span>using Next.js & TypeScript</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
