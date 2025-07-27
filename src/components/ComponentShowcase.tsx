'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Heart, ExternalLink, Github } from 'lucide-react'
import { FaReact, FaNodeJs } from 'react-icons/fa'

export default function ComponentShowcase() {
  return (
    <div className="space-y-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Design System Showcase</h2>
        <p className="text-slate-400">Testing our reusable UI components</p>
      </motion.div>

      {/* Button Showcase */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-white">Buttons</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm" leftIcon={<Heart className="w-4 h-4" />}>
              With Icon
            </Button>
            <Button variant="outline" size="lg" rightIcon={<ExternalLink className="w-5 h-5" />}>
              Large Button
            </Button>
            <Button variant="primary" isLoading>
              Loading State
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default" hover>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Default Card</h3>
          </CardHeader>
          <CardContent>
            <p>This is a default card with hover effects.</p>
          </CardContent>
          <CardFooter>
            <Badge variant="primary">Default</Badge>
          </CardFooter>
        </Card>

        <Card variant="elevated" hover>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Elevated Card</h3>
          </CardHeader>
          <CardContent>
            <p>This card has elevated styling with shadows.</p>
          </CardContent>
          <CardFooter>
            <Badge variant="success">Elevated</Badge>
          </CardFooter>
        </Card>

        <Card variant="bordered" hover>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Bordered Card</h3>
          </CardHeader>
          <CardContent>
            <p>This card has a subtle border.</p>
          </CardContent>
          <CardFooter>
            <Badge variant="warning">Bordered</Badge>
          </CardFooter>
        </Card>
      </div>

      {/* Badge Showcase */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-white">Badges</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="success" size="lg">Large</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack Example */}
      <Card variant="elevated">
        <CardHeader>
          <h3 className="text-xl font-semibold text-white">Example: Technology Stack</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">
              <FaReact className="w-3 h-3 mr-1" />
              React
            </Badge>
            <Badge variant="primary">
              <FaNodeJs className="w-3 h-3 mr-1" />
              Node.js
            </Badge>
            <Badge variant="success">TypeScript</Badge>
            <Badge variant="warning">Tailwind CSS</Badge>
          </div>
          <p className="text-slate-300 mb-4">
            This demonstrates how our components work together to create rich, interactive interfaces.
          </p>
        </CardContent>
        <CardFooter className="gap-3">
          <Button variant="primary" leftIcon={<Github className="w-4 h-4" />}>
            View Code
          </Button>
          <Button variant="outline" rightIcon={<ExternalLink className="w-4 h-4" />}>
            Live Demo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
