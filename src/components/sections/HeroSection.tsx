'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'

// Content to be typed
const typingContent = [
  { greeting: "Welcome to David P Donohue.com!! I'm so happy you stopped by!", color: "text-primary-sunset-orange" },
  { intro: "I'm David, and I'll be your guide as you explore my website!", color: "text-primary-blue" },
  { body: "I am a Full Stack Web Developer,", color: "text-primary-magenta" },
  { body: "a Project Manager,", color: "text-primary-magenta" },
  { body: "an IT Professional,", color: "text-primary-magenta" },
  { body: "and a human being.", color: "text-primary-magenta" },
  { narrative: "I'm passionate about Healthcare, FinTech, Cybersecurity, Artificial Intelligence and creating elegant, functional solutions that solve real-world problems.", color: "text-primary-yellow" },
  { narrative: "Use the navigation links at the top of the page to explore and learn more about me! Enjoy!", color: "text-primary-yellow" }
];

export default function HeroSection() {
  const pathname = usePathname()
  const terminalPath = getTerminalPath(pathname)
  
  // Typing animation states
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  
  // Typing effect using setTimeout
  useEffect(() => {
    if (currentLineIndex >= typingContent.length) return;
    
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
  
  // Get current typed text
  const getCurrentTypedText = () => {
    if (currentLineIndex >= typingContent.length) return '';
    const currentLine = typingContent[currentLineIndex];
    const currentLineText = getLineText(currentLine);
    return currentLineText.slice(0, currentCharIndex);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-navy">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy/90 to-primary-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-primary-navy/70 backdrop-blur-sm p-8 rounded-lg border border-primary-blue/20 shadow-xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 border-b border-primary-blue/20 pb-2">
            <div className="text-primary-blue/70 font-mono text-sm">terminal@davidpdonohue.com:{terminalPath}$</div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-primary-sunset-orange"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="font-mono text-left space-y-4">
            {/* Display completed lines */}
            {completedLines.map((lineText, index) => {
              const lineConfig = typingContent[index];
              if (!lineConfig) return null;
              
              const lineType = Object.keys(lineConfig).find(key => key !== 'color') || '';
              const fontSize = getTypingFontSize(lineType);
              const color = getLineColor(lineConfig);
              
              return (
                <div key={index} className={`${fontSize} ${color}`}>
                  {lineText}
                </div>
              );
            })}
            
            {/* Current typing line */}
            {currentLineIndex < typingContent.length && (
              <div className={`${(() => {
                const currentLine = typingContent[currentLineIndex];
                const lineType = Object.keys(currentLine).find(key => key !== 'color') || '';
                return getTypingFontSize(lineType);
              })()} ${getLineColor(typingContent[currentLineIndex])}`}>
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
        
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentLineIndex >= typingContent.length ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-6 mt-12"
        >
          <a 
            href="https://github.com/sdirishguy"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-blue transition-colors text-2xl"
          >
            <span className="sr-only">GitHub</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/in/davidpatrickdonohue"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-primary-blue transition-colors text-2xl"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
                            href="mailto:david@davidpdonohue.com"
            className="text-slate-400 hover:text-primary-blue transition-colors text-2xl"
          >
            <span className="sr-only">Email</span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
