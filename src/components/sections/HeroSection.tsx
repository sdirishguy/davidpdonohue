'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'

// Content to be typed
const typingContent = [
  { greeting: "Welcome to David P Donohue.com!! I'm so happy you stopped by!", color: "text-primary-sunset-orange" },
  { intro: "I'm David, and I'll be your guide as you explore my website!", color: "text-primary-blue" },
  { body: "The site is divided up into 5 sections: Personal, Professional, Projects and Content amd Contact.", color: "text-primary-magenta" },
  { body: "I'm a curious guy with interests and passions covering topics ranging from healthcare, fintech, cybersecurity, and artificial intelligence.", color: "text-primary-blue" },
  { narrative: "To sports like tennis and soccer, traveling, and food to politics, philosohpy and religion", color: "text-primary-blue" },
  { narrative: "Use the navigation links at the top of the page to explore and learn more about me!", color: "text-primary-yellow" },
  { narrative: "Enjoy!", color: "text-primary-magenta" }
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
      </div>
    </section>
  )
}
