/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const blogPosts = [
  {
    title: "Building Scalable React Applications",
    excerpt: "Learn best practices for structuring large React applications with proper state management and component architecture.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Architecture"],
    featured: true
  },
  {
    title: "Modern CSS Techniques for Developers",
    excerpt: "Explore the latest CSS features including Grid, Flexbox, and custom properties to create stunning layouts.",
    date: "2023-12-20",
    readTime: "6 min read",
    tags: ["CSS", "Frontend", "Design"]
  },
  {
    title: "API Design Best Practices",
    excerpt: "Guidelines for creating RESTful APIs that are maintainable, scalable, and developer-friendly.",
    date: "2023-11-30",
    readTime: "10 min read",
    tags: ["API", "Backend", "Node.js"]
  },
  {
    title: "TypeScript Tips for Better Code",
    excerpt: "Advanced TypeScript patterns and techniques to write more robust and maintainable code.",
    date: "2023-11-10",
    readTime: "7 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices"]
  }
]

const tutorials = [
  {
    title: "Complete Next.js 14 Tutorial",
    description: "A comprehensive guide to building modern web applications with Next.js 14, including App Router and Server Components.",
    duration: "2 hours",
    level: "Intermediate",
    topics: ["Next.js", "React", "Server Components", "App Router"]
  },
  {
    title: "Docker for Developers",
    description: "Learn how to containerize your applications and set up development environments with Docker.",
    duration: "1.5 hours",
    level: "Beginner",
    topics: ["Docker", "DevOps", "Containers"]
  },
  {
    title: "Advanced React Patterns",
    description: "Master advanced React patterns including render props, higher-order components, and custom hooks.",
    duration: "3 hours",
    level: "Advanced",
    topics: ["React", "Patterns", "Hooks", "Performance"]
  }
]

const resources = [
  {
    title: "Developer Toolkit",
    description: "A curated list of tools, libraries, and resources I use for web development.",
    type: "Resource List",
    items: ["VS Code Extensions", "Chrome DevTools", "Design Tools", "Testing Libraries"]
  },
  {
    title: "Code Snippets Collection",
    description: "Useful code snippets and utilities for common development tasks.",
    type: "Code Repository",
    items: ["React Hooks", "CSS Utilities", "JavaScript Functions", "Node.js Helpers"]
  },
  {
    title: "Learning Path: Full Stack Development",
    description: "A structured learning path for becoming a full-stack developer.",
    type: "Learning Guide",
    items: ["Frontend Basics", "Backend Development", "Database Design", "Deployment"]
  }
]

export default function ContentSection() {
  return (
    <section className="py-20 bg-primary-navy">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Content & Resources
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Articles, tutorials, and resources I've created to share knowledge and help other developers grow.
          </p>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Latest Articles</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full ${post.featured ? 'ring-2 ring-cyan-500/50' : ''}`}>
                  {post.featured && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="primary">Featured</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-300 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Read Article</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Video Tutorials</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white mb-3">{tutorial.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="secondary">{tutorial.level}</Badge>
                      <span className="text-slate-300">{tutorial.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4 leading-relaxed">{tutorial.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tutorial.topics.map((topic, i) => (
                        <Badge key={i} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" size="sm">Watch Tutorial</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Developer Resources</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                      <Badge variant="success">{resource.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4 leading-relaxed">{resource.description}</p>
                    <div className="space-y-2">
                      <p className="text-white font-semibold text-sm">Includes:</p>
                      <ul className="space-y-1">
                        {resource.items.map((item, i) => (
                          <li key={i} className="text-slate-200 text-sm flex items-center">
                            <span className="text-primary-blue mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View Resource</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

