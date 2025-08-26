'use client'

import { usePathname } from 'next/navigation'
import { getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'
import { useTerminalAnimation } from '@/hooks/useTerminalAnimation'
import { TerminalHeader } from '@/components/ui/TerminalHeader'

// Content to be typed
const typingContent = [
  { greeting: "Welcome to David P Donohue.com!! I'm so happy you stopped by!", color: "text-primary-sunset-orange" },
  { intro: "I'm David, and I'll be your guide as you explore my website!", color: "text-primary-blue" },
  { body: "The site is divided up into 5 sections: Personal, Professional, Projects, Content and Contact.", color: "text-primary-magenta" },
  { body: "I'm a curious guy with interests and passions covering topics ranging from healthcare, fintech, cybersecurity, and artificial intelligence.", color: "text-primary-blue" },
  { narrative: "To sports like tennis and soccer, traveling, and food to politics, philosohpy and religion", color: "text-primary-blue" },
  { narrative: "Use the navigation links at the top of the page to explore and learn more about me!", color: "text-primary-yellow" },
  { narrative: "Enjoy!", color: "text-primary-magenta" }
];

export default function HeroSection() {
  const pathname = usePathname()
  const terminalPath = getTerminalPath(pathname)
  
  // Use the terminal animation hook
  const {
    currentLineIndex,
    completedLines,
    isAnimationComplete,
    skipAnimation,
    replayAnimation,
    getCurrentTypedText,
  } = useTerminalAnimation({
    typingContent,
    getLineText,
  });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-navy">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy/90 to-primary-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-primary-navy/70 backdrop-blur-sm p-8 rounded-lg border border-primary-blue/20 shadow-xl">
          {/* Terminal Header */}
          <TerminalHeader
            terminalPath={terminalPath}
            isAnimationComplete={isAnimationComplete}
            onSkip={skipAnimation}
            onReplay={replayAnimation}
          />
          
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
