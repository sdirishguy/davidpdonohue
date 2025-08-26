import { useState, useEffect, useCallback } from 'react';

interface TypingContent {
  [key: string]: string | undefined;
}

interface UseTerminalAnimationProps {
  typingContent: TypingContent[];
  getLineText: (line: TypingContent) => string;
}

export const useTerminalAnimation = ({ typingContent, getLineText }: UseTerminalAnimationProps) => {
  // Typing animation states
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Animation control functions
  const skipAnimation = useCallback(() => {
    setCompletedLines(typingContent.map(line => getLineText(line)));
    setCurrentLineIndex(typingContent.length);
    setCurrentCharIndex(0);
    setIsAnimationComplete(true);
  }, [typingContent, getLineText]);

  const replayAnimation = useCallback(() => {
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setCompletedLines([]);
    setIsAnimationComplete(false);
  }, []);

  // Keyboard shortcuts for animation controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isAnimationComplete) {
        event.preventDefault();
        skipAnimation();
      } else if (event.code === 'KeyR' && isAnimationComplete) {
        event.preventDefault();
        replayAnimation();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isAnimationComplete, skipAnimation, replayAnimation]);

  // Typing effect using setTimeout
  useEffect(() => {
    if (currentLineIndex >= typingContent.length) {
      setIsAnimationComplete(true);
      return;
    }
    
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
  }, [currentLineIndex, currentCharIndex, typingContent, getLineText]);

  // Get current typed text
  const getCurrentTypedText = () => {
    if (currentLineIndex >= typingContent.length) return '';
    const currentLine = typingContent[currentLineIndex];
    const currentLineText = getLineText(currentLine);
    return currentLineText.slice(0, currentCharIndex);
  };

  return {
    currentLineIndex,
    currentCharIndex,
    completedLines,
    isAnimationComplete,
    skipAnimation,
    replayAnimation,
    getCurrentTypedText,
  };
};
