'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function ComponentShowcase() {
  return (
    <div className="space-y-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Component Showcase
        </h2>
        <p className="text-slate-300">
          Interactive components built with Tailwind CSS
        </p>
      </motion.div>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold text-white">Buttons</h3>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold text-white">Cards</h3>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold text-white">Project Card</h4>
            </CardHeader>
            <CardContent>
              <p className="text-slate-200 mb-4">
                A sample project card with description and badges.
              </p>
              <div className="flex gap-2">
                <Badge variant="primary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">View Project</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold text-white">Skill Card</h4>
            </CardHeader>
            <CardContent>
              <p className="text-slate-200 mb-4">
                Another example card showing different content types.
              </p>
              <div className="flex gap-2">
                <Badge variant="success">Advanced</Badge>
                <Badge variant="outline">Frontend</Badge>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold text-white">Badges</h3>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </CardContent>
      </Card>

      {/* Interactive Demo */}
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold text-white">Interactive Demo</h3>
        </CardHeader>
        <CardContent>
          <p className="text-slate-200 mb-4">
            Click the button below to see a simple interaction:
          </p>
          <Button 
            variant="primary"
            onClick={() => alert('Hello from David P. Donohue\'s portfolio!')}
          >
            Click Me!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

