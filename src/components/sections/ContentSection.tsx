/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ContentPlaceholder from './ContentPlaceholder'

// Set this to true to show the placeholder, false to show the full content
const SHOW_PLACEHOLDER = true;

// Typing animation content
const typingContent = [
  { intro: "Welcome to my content library! 📚", color: "text-primary-blue" },
  { description: "Here you'll find articles, videos, tutorials, and resources I've created or found valuable.", color: "text-primary-magenta" },
  { instructions: "Use the interactive terminal below to explore content by keywords or browse everything.", color: "text-primary-sunset-orange" },
  { action: "Happy exploring!", color: "text-primary-yellow" }
];

// Content database
const contentDatabase = [
  // My Blog Posts
  {
    id: "blog-1",
    title: "Building Scalable React Applications",
    excerpt: "Learn best practices for structuring large React applications with proper state management and component architecture.",
    date: "2024-01-15",
    readTime: "8 min read",
    type: "blog",
    author: "me",
    tags: ["React", "JavaScript", "Architecture", "Frontend"],
    featured: true,
    url: "/blog/building-scalable-react-applications"
  },
  {
    id: "blog-2",
    title: "Modern CSS Techniques for Developers",
    excerpt: "Explore the latest CSS features including Grid, Flexbox, and custom properties to create stunning layouts.",
    date: "2023-12-20",
    readTime: "6 min read",
    type: "blog",
    author: "me",
    tags: ["CSS", "Frontend", "Design"],
    url: "/blog/modern-css-techniques"
  },
  {
    id: "blog-3",
    title: "API Design Best Practices",
    excerpt: "Guidelines for creating RESTful APIs that are maintainable, scalable, and developer-friendly.",
    date: "2023-11-30",
    readTime: "10 min read",
    type: "blog",
    author: "me",
    tags: ["API", "Backend", "Node.js", "REST"],
    url: "/blog/api-design-best-practices"
  },
  {
    id: "blog-4",
    title: "TypeScript Tips for Better Code",
    excerpt: "Advanced TypeScript patterns and techniques to write more robust and maintainable code.",
    date: "2023-11-10",
    readTime: "7 min read",
    type: "blog",
    author: "me",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    url: "/blog/typescript-tips"
  },
  {
    id: "blog-5",
    title: "Python Django vs Flask: Choosing the Right Framework",
    excerpt: "A detailed comparison of Django and Flask to help you choose the right Python web framework for your project.",
    date: "2023-10-15",
    readTime: "12 min read",
    type: "blog",
    author: "me",
    tags: ["Python", "Django", "Flask", "Backend", "Web Development"],
    url: "/blog/django-vs-flask"
  },

  // My Video Tutorials
  {
    id: "vlog-1",
    title: "Complete Next.js 14 Tutorial",
    excerpt: "A comprehensive guide to building modern web applications with Next.js 14, including App Router and Server Components.",
    date: "2024-02-10",
    duration: "2 hours",
    type: "vlog",
    author: "me",
    tags: ["Next.js", "React", "Server Components", "App Router", "Tutorial"],
    url: "/videos/nextjs-14-tutorial"
  },
  {
    id: "vlog-2",
    title: "Docker for Developers",
    excerpt: "Learn how to containerize your applications and set up development environments with Docker.",
    date: "2024-01-05",
    duration: "1.5 hours",
    type: "vlog",
    author: "me",
    tags: ["Docker", "DevOps", "Containers", "Tutorial"],
    url: "/videos/docker-for-developers"
  },
  {
    id: "vlog-3",
    title: "Advanced React Patterns",
    excerpt: "Master advanced React patterns including render props, higher-order components, and custom hooks.",
    date: "2023-12-12",
    duration: "3 hours",
    type: "vlog",
    author: "me",
    tags: ["React", "Patterns", "Hooks", "Performance", "Tutorial"],
    url: "/videos/advanced-react-patterns"
  },

  // External Articles I Recommend
  {
    id: "ext-blog-1",
    title: "Understanding the JavaScript Event Loop",
    excerpt: "A deep dive into how the JavaScript event loop works and why it matters for performance.",
    date: "2024-01-20",
    readTime: "15 min read",
    type: "blog",
    author: "Jake Archibald",
    tags: ["JavaScript", "Performance", "Event Loop", "Async"],
    url: "https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/"
  },
  {
    id: "ext-blog-2",
    title: "Python Design Patterns",
    excerpt: "Implementing common design patterns in Python with practical examples.",
    date: "2023-11-25",
    readTime: "20 min read",
    type: "blog",
    author: "Real Python",
    tags: ["Python", "Design Patterns", "Software Architecture"],
    url: "https://realpython.com/python-design-patterns/"
  },

  // External Videos I Recommend
  {
    id: "ext-vlog-1",
    title: "Django REST Framework Complete Course",
    excerpt: "Build powerful APIs with Django REST Framework from scratch to deployment.",
    date: "2023-10-05",
    duration: "4 hours",
    type: "vlog",
    author: "Traversy Media",
    tags: ["Django", "Python", "REST", "API", "Tutorial"],
    url: "https://www.youtube.com/watch?v=example1"
  },
  {
    id: "ext-vlog-2",
    title: "Advanced CSS Animation Techniques",
    excerpt: "Learn how to create stunning animations using pure CSS and GSAP.",
    date: "2023-09-15",
    duration: "1.5 hours",
    type: "vlog",
    author: "Kevin Powell",
    tags: ["CSS", "Animation", "GSAP", "Frontend"],
    url: "https://www.youtube.com/watch?v=example2"
  },

  // Resources
  {
    id: "resource-1",
    title: "Developer Toolkit",
    excerpt: "A curated list of tools, libraries, and resources I use for web development.",
    date: "2024-02-01",
    type: "resource",
    author: "me",
    tags: ["Tools", "VS Code", "Chrome DevTools", "Design Tools", "Testing"],
    url: "/resources/developer-toolkit"
  },
  {
    id: "resource-2",
    title: "Code Snippets Collection",
    excerpt: "Useful code snippets and utilities for common development tasks.",
    date: "2024-01-10",
    type: "resource",
    author: "me",
    tags: ["Code Snippets", "React", "CSS", "JavaScript", "Node.js"],
    url: "/resources/code-snippets"
  },
  {
    id: "resource-3",
    title: "Learning Path: Full Stack Development",
    excerpt: "A structured learning path for becoming a full-stack developer.",
    date: "2023-12-05",
    type: "resource",
    author: "me",
    tags: ["Learning Path", "Full Stack", "Frontend", "Backend", "Database"],
    url: "/resources/learning-path-fullstack"
  }
];

// Terminal commands and help text
const terminalCommands = {
  help: "Available commands:\n  search [keywords] - Search content by keywords\n  list [type] - List content by type (blog, vlog, resource, all)\n  featured - Show featured content\n  clear - Clear terminal\n  help - Show this help message",
  notFound: "Command not found. Type 'help' for available commands."
};

export default function ContentSection() {
  // Typing animation states - moved to top to fix hooks rule
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  
  // Terminal states
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{type: string, content: string | React.ReactNode}>>([
    { type: "system", content: "Content Explorer v1.0.0" },
    { type: "system", content: "Type 'help' for available commands or start searching with 'search [keywords]'" }
  ]);
  const [filteredContent, setFilteredContent] = useState<Array<any>>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Helper function to get text content from any line object
  const getLineText = (line: {intro?: string, description?: string, instructions?: string, action?: string}) => {
    return line.intro || line.description || line.instructions || line.action || '';
  };

  // Typing effect using setTimeout
  useEffect(() => {
    if (SHOW_PLACEHOLDER || currentLineIndex >= typingContent.length) return;
    
    const currentLine = typingContent[currentLineIndex];
    const currentLineText = getLineText(currentLine);
    
    if (currentCharIndex < currentLineText.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, Math.floor(Math.random() * 40) + 40);
      
      return () => clearTimeout(timeout);
    } else {
      // Line is complete, move to next line after delay
      const timeout = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLineText]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);
  
  // Scroll terminal to bottom when history updates
  useEffect(() => {
    if (SHOW_PLACEHOLDER) return;
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Get current typed text
  const getCurrentTypedText = () => {
    if (currentLineIndex >= typingContent.length) return '';
    const currentLine = typingContent[currentLineIndex];
    const currentLineText = getLineText(currentLine);
    return currentLineText.slice(0, currentCharIndex);
  };

  // Show placeholder if flag is set
  if (SHOW_PLACEHOLDER) {
    return <ContentPlaceholder />;
  }
  
  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle terminal input submission
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!terminalInput.trim()) return;
    
    // Add user input to history
    setTerminalHistory(prev => [...prev, { type: "input", content: `> ${terminalInput}` }]);
    
    // Process command
    processCommand(terminalInput);
    
    // Clear input
    setTerminalInput("");
  };
  
  // Process terminal commands
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Help command
    if (lowerCommand === "help") {
      setTerminalHistory(prev => [...prev, { type: "output", content: terminalCommands.help }]);
      setShowResults(false);
      return;
    }
    
    // Clear command
    if (lowerCommand === "clear") {
      setTerminalHistory([
        { type: "system", content: "Content Explorer v1.0.0" },
        { type: "system", content: "Type 'help' for available commands or start searching with 'search [keywords]'" }
      ]);
      setShowResults(false);
      return;
    }
    
    // Featured command
    if (lowerCommand === "featured") {
      const featured = contentDatabase.filter(item => item.featured);
      setFilteredContent(featured);
      setCurrentPage(1);
      
      if (featured.length > 0) {
        setTerminalHistory(prev => [...prev, { 
          type: "output", 
          content: `Found ${featured.length} featured item${featured.length !== 1 ? 's' : ''}.` 
        }]);
        setShowResults(true);
      } else {
        setTerminalHistory(prev => [...prev, { type: "output", content: "No featured content found." }]);
        setShowResults(false);
      }
      return;
    }
    
    // List command
    if (lowerCommand.startsWith("list ") || lowerCommand === "list") {
      const type = lowerCommand.split(" ")[1] || "all";
      let filtered;
      
      if (type === "all") {
        filtered = contentDatabase;
      } else {
        filtered = contentDatabase.filter(item => item.type === type);
      }
      
      setFilteredContent(filtered);
      setCurrentPage(1);
      
      if (filtered.length > 0) {
        setTerminalHistory(prev => [...prev, { 
          type: "output", 
          content: `Found ${filtered.length} ${type !== "all" ? type : "total"} item${filtered.length !== 1 ? 's' : ''}.` 
        }]);
        setShowResults(true);
      } else {
        setTerminalHistory(prev => [...prev, { 
          type: "output", 
          content: `No ${type !== "all" ? type : ""} content found.` 
        }]);
        setShowResults(false);
      }
      return;
    }
    
    // Search command
    if (lowerCommand.startsWith("search ")) {
      const keywords = lowerCommand.substring(7).split(" ").filter(k => k.trim() !== "");
      
      if (keywords.length === 0) {
        setTerminalHistory(prev => [...prev, { 
          type: "output", 
          content: "Please provide search keywords. Example: search react javascript" 
        }]);
        setShowResults(false);
        return;
      }
      
      const results = contentDatabase.filter(item => {
        const searchableText = [
          item.title,
          item.excerpt,
          ...item.tags
        ].join(" ").toLowerCase();
        
        return keywords.some(keyword => searchableText.includes(keyword.toLowerCase()));
      });
      
      setFilteredContent(results);
      setCurrentPage(1);
      
      if (results.length > 0) {
        setTerminalHistory(prev => [...prev, { 
          type: "output", 
          content: `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${keywords.join(", ")}".` 
        }]);
        setShowResults(true);
      } else {
        setTerminalHistory(prev => [...prev, { 
          type: "output", 
          content: `No results found for "${keywords.join(", ")}".` 
        }]);
        setShowResults(false);
      }
      return;
    }
    
    // Command not found
    setTerminalHistory(prev => [...prev, { type: "output", content: terminalCommands.notFound }]);
    setShowResults(false);
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const currentItems = filteredContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Get content type badge
  const getContentTypeBadge = (type: string, author: string) => {
    switch (type) {
      case "blog":
        return <Badge variant={author === "me" ? "primary" : "outline"}>
          {author === "me" ? "My Article" : "External Article"}
        </Badge>;
      case "vlog":
        return <Badge variant={author === "me" ? "primary" : "outline"}>
          {author === "me" ? "My Video" : "External Video"}
        </Badge>;
      case "resource":
        return <Badge variant="success">Resource</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <section className="py-20 bg-primary-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,73,153,0.03),transparent_40%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Terminal Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-3xl mx-auto bg-primary-navy/40 backdrop-blur-sm p-6 rounded-lg border border-primary-blue/20 shadow-lg">
            <div className="flex items-center justify-between mb-4 border-b border-primary-blue/20 pb-2">
              <div className="text-primary-blue/70 font-mono text-sm">content@opfynder.com</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="font-mono text-left space-y-4">
              {/* Display completed lines */}
              {completedLines.map((lineText, index) => {
                const lineConfig = typingContent[index];
                if (!lineConfig) return null;
                
                return (
                  <div key={index} className={`text-lg ${lineConfig.color}`}>
                    {lineText}
                  </div>
                );
              })}
              
              {/* Current typing line */}
              {currentLineIndex < typingContent.length && (
                <div className={`text-lg ${typingContent[currentLineIndex].color}`}>
                  {getCurrentTypedText()}
                  <span className="animate-pulse">▌</span>
                </div>
              )}
              
              {/* Show cursor at the end when all lines are typed */}
              {currentLineIndex >= typingContent.length && (
                <div className="text-lg text-primary-blue">
                  <span className="animate-pulse">▌</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div 
            className="bg-primary-navy/60 backdrop-blur-sm p-4 rounded-lg border border-primary-magenta/20 shadow-lg cursor-text"
            onClick={focusInput}
          >
            <div className="flex items-center justify-between mb-4 border-b border-primary-magenta/20 pb-2">
              <div className="text-primary-magenta/70 font-mono text-sm">content-explorer@terminal</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            {/* Terminal Output */}
            <div 
              ref={terminalRef}
              className="font-mono text-sm space-y-2 max-h-60 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-primary-blue/30 scrollbar-track-transparent"
            >
              {terminalHistory.map((entry, index) => (
                <div 
                  key={index} 
                  className={`${
                    entry.type === "input" ? "text-primary-yellow" : 
                    entry.type === "output" ? "text-primary-blue" : 
                    "text-slate-400"
                  } whitespace-pre-wrap`}
                >
                  {entry.content}
                </div>
              ))}
            </div>
            
            {/* Terminal Input */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center border-t border-primary-magenta/20 pt-3">
              <span className="text-primary-magenta mr-2">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                placeholder="Type a command (try 'help' or 'search python')"
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Search Results
                </h2>
                <div className="text-slate-300">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredContent.length)} of {filteredContent.length}
                </div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:border-primary-blue/30 transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          {getContentTypeBadge(item.type, item.author)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span>{item.readTime || item.duration}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-200 mb-4 leading-relaxed">{item.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag: string, i: number) => (
                            <Badge key={i} variant="outline">{tag}</Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline">+{item.tags.length - 3}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(item.url, '_blank')}
                        >
                          {item.type === 'blog' ? 'Read Article' : 
                           item.type === 'vlog' ? 'Watch Video' : 'View Resource'}
                        </Button>
                        {item.author !== 'me' && (
                          <span className="text-sm text-slate-400">by {item.author}</span>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Categories */}
        {!showResults && (
          <>
            {/* My Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent flex-grow"></div>
                <h2 className="text-3xl font-bold text-white px-6">My Content</h2>
                <div className="h-px bg-gradient-to-r from-primary-blue via-transparent to-transparent flex-grow"></div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2">
                {contentDatabase
                  .filter(item => item.author === "me" && item.type === "blog")
                  .slice(0, 4)
                  .map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className={`h-full relative ${post.featured ? 'ring-2 ring-primary-blue/50' : ''}`}>
                        {post.featured && (
                          <div className="absolute -top-2 left-4 z-10">
                            <Badge variant="primary">Featured</Badge>
                          </div>
                        )}
                        <CardHeader>
                          <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-300 mb-3">
                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(post.url, '_blank')}
                          >
                            Read Article
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
              
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                {contentDatabase
                  .filter(item => item.author === "me" && item.type === "vlog")
                  .slice(0, 3)
                  .map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <h3 className="text-xl font-bold text-white mb-3">{video.title}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="primary">My Video</Badge>
                            <span className="text-slate-300">{video.duration}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-200 mb-4 leading-relaxed">{video.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {video.tags.slice(0, 4).map((tag, i) => (
                              <Badge key={i} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => window.open(video.url, '_blank')}
                          >
                            Watch Tutorial
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Recommended Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary-magenta to-transparent flex-grow"></div>
                <h2 className="text-3xl font-bold text-white px-6">Recommended Content</h2>
                <div className="h-px bg-gradient-to-r from-primary-magenta via-transparent to-transparent flex-grow"></div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {contentDatabase
                  .filter(item => item.author !== "me")
                  .slice(0, 6)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full border border-primary-magenta/10 hover:border-primary-magenta/30 transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            {getContentTypeBadge(item.type, item.author)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-300">
                            <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>{item.readTime || item.duration}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-200 mb-4 leading-relaxed">{item.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="outline">{tag}</Badge>
                            ))}
                            {item.tags.length > 3 && (
                              <Badge variant="outline">+{item.tags.length - 3}</Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.url, '_blank')}
                          >
                            {item.type === 'blog' ? 'Read Article' : 'Watch Video'}
                          </Button>
                          <span className="text-sm text-slate-400">by {item.author}</span>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-primary-sunset-orange to-transparent flex-grow"></div>
                <h2 className="text-3xl font-bold text-white px-6">Developer Resources</h2>
                <div className="h-px bg-gradient-to-r from-primary-sunset-orange via-transparent to-transparent flex-grow"></div>
              </div>
              
              <div className="grid gap-8 lg:grid-cols-3">
                {contentDatabase
                  .filter(item => item.type === "resource")
                  .map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full border border-primary-sunset-orange/10 hover:border-primary-sunset-orange/30 transition-all">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                            <Badge variant="success">Resource</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-200 mb-4 leading-relaxed">{resource.excerpt}</p>
                          <div className="space-y-2">
                            <p className="text-white font-semibold text-sm">Includes:</p>
                            <ul className="space-y-1">
                              {resource.tags.map((tag, i) => (
                                <li key={i} className="text-slate-200 text-sm flex items-center">
                                  <span className="text-primary-sunset-orange mr-2">•</span>
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            View Resource
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </>
        )}
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary-blue/10 via-primary-magenta/10 to-primary-sunset-orange/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Looking for something specific?</h3>
            <p className="text-slate-300 mb-6">
              Try using the interactive terminal above to search for content by keywords or browse by type.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                onClick={() => {
                  setTerminalHistory(prev => [...prev, 
                    { type: "input", content: "> list all" },
                    { type: "output", content: `Found ${contentDatabase.length} total items.` }
                  ]);
                  setFilteredContent(contentDatabase);
                  setCurrentPage(1);
                  setShowResults(true);
                  if (terminalRef.current) {
                    terminalRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Browse All Content
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTerminalHistory(prev => [...prev, 
                    { type: "input", content: "> help" },
                    { type: "output", content: terminalCommands.help }
                  ]);
                  setShowResults(false);
                  if (terminalRef.current) {
                    terminalRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Terminal Help
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
