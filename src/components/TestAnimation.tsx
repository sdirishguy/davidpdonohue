'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { FaReact } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { ANIMATIONS } from '@/lib/constants'

export default function TestAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATIONS.pageTransition.duration }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg",
        "bg-slate-800 border border-slate-700",
        "hover:bg-slate-700 transition-colors"
      )}
    >
      <FaReact className="text-cyan-400 text-2xl animate-spin" style={{ animationDuration: '3s' }} />
      <span className="text-white">Project structure created successfully!</span>
      <Heart className="text-red-400 text-xl" />
    </motion.div>
  )
}
