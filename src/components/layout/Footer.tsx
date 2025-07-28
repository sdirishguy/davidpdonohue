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
  { name: 'Email', href: 'mailto:david@opfynder.com', icon: Mail },
]

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Professional',
    links: [
      { name: 'Resume', href: '/professional' },
      { name: 'Experience', href: '/professional#experience' },
      { name: 'Skills', href: '/professional#skills' },
    ]
  },
  {
    title: 'Content',
    links: [
      { name: 'Blog Posts', href: '/content' },
      { name: 'Videos', href: '/content#videos' },
      { name: 'Resources', href: '/content#resources' },
    ]
  }
]

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('bg-primary-navy border-t border-primary-blue/20', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-primary-blue mb-4">David P. Donohue</h3>
            <p className="text-slate-300 mb-6 max-w-sm">
              Full-stack developer passionate about creating beautiful, functional web applications, 
              lifelong learning and the sharing of knowledge with the community.
            </p>
            <div className="flex space-x-4">
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
                    <Icon className="w-6 h-6" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('#') || link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-primary-blue transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-primary-blue transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-primary-blue/20 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-slate-300 text-sm mb-4 sm:mb-0">
            © {currentYear} DavidPDonohue.com. All rights reserved.
          </p>
          <div className="flex items-center text-slate-300 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-400" />
            <span>using Next.js & TypeScript</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
