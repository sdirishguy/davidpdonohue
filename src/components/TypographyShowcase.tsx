'use client'

import { motion } from 'framer-motion'
import Card, { CardHeader, CardContent } from '@/components/ui/Card'
import { 
  Title, 
  Subtitle, 
  H1, 
  H2, 
  H3, 
  H4, 
  Body, 
  BodyLarge, 
  BodySmall, 
  Lead, 
  Code, 
  Caption, 
  Overline,
  Text 
} from '@/components/ui/Typography'

export default function TypographyShowcase() {
  return (
    <div className="space-y-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Title>Typography System</Title>
        <Subtitle className="mt-4">
          Consistent, beautiful typography for your portfolio
        </Subtitle>
      </motion.div>

      {/* Headings */}
      <Card>
        <CardHeader>
          <H3>Headings</H3>
        </CardHeader>
        <CardContent className="space-y-4">
          <H1>Heading 1 - Main Title</H1>
          <H2>Heading 2 - Section Title</H2>
          <H3>Heading 3 - Subsection</H3>
          <H4>Heading 4 - Component Title</H4>
        </CardContent>
      </Card>

      {/* Body Text */}
      <Card>
        <CardHeader>
          <H3>Body Text</H3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Lead>
            This is lead text - perfect for introductions and important statements that need to stand out from regular body text.
          </Lead>
          <BodyLarge>
            Large body text - great for important paragraphs that need more emphasis than regular body text.
          </BodyLarge>
          <Body>
            Regular body text - the foundation of your content. This is what most of your text should use for optimal readability and consistency.
          </Body>
          <BodySmall>
            Small body text - useful for captions, footnotes, and secondary information that supports the main content.
          </BodySmall>
        </CardContent>
      </Card>

      {/* Special Text */}
      <Card>
        <CardHeader>
          <H3>Special Text Styles</H3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Overline>
            Overline Text - Great for Categories
          </Overline>
          <Caption>
            Caption text for images and supplementary information
          </Caption>
          <Body>
            Inline code example: <Code>npm install next</Code>
          </Body>
          <pre className="font-mono text-sm bg-primary-navy/80 p-4 rounded-lg overflow-x-auto text-slate-200">
{`// Code block example
function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Color Variants */}
      <Card>
        <CardHeader>
          <H3>Color Variants</H3>
        </CardHeader>
        <CardContent className="space-y-3">
          <Body><Text color="primary">Primary color</Text> - for important links and highlights</Body>
          <Body><Text color="secondary">Secondary color</Text> - for regular text content</Body>
          <Body><Text color="muted">Muted color</Text> - for less important information</Body>
          <Body><Text color="accent">Accent color</Text> - for special emphasis</Body>
          <Body><Text color="success">Success color</Text> - for positive messages</Body>
          <Body><Text color="warning">Warning color</Text> - for cautionary messages</Body>
          <Body><Text color="error">Error color</Text> - for error messages</Body>
          <Body><Text color="white">White color</Text> - for high contrast text</Body>
          <H3><Text color="gradient">Gradient text</Text> - for special titles</H3>
        </CardContent>
      </Card>

      {/* Responsive Example */}
      <Card>
        <CardHeader>
          <H3>Responsive Typography</H3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Body className="text-slate-300">
            All typography scales responsively across different screen sizes. 
            Try resizing your browser to see how headings and text adapt.
          </Body>
          <Title>
            This heading scales from 4xl to 6xl
          </Title>
          <Lead>
            This lead text adjusts from lg to xl based on screen size
          </Lead>
        </CardContent>
      </Card>
    </div>
  )
}

