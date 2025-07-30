import React from 'react';

interface YellowAccentProps {
  children: React.ReactNode;
  variant?: 'text' | 'background' | 'border' | 'highlight';
  className?: string;
}

export default function YellowAccent({ 
  children, 
  variant = 'text', 
  className = '' 
}: YellowAccentProps) {
  const baseClasses = 'transition-all duration-200';
  
  const variantClasses = {
    text: 'text-primary-yellow hover:text-primary-yellow/80',
    background: 'bg-primary-yellow/20 hover:bg-primary-yellow/30 text-primary-yellow',
    border: 'border-2 border-primary-yellow/50 hover:border-primary-yellow text-primary-yellow',
    highlight: 'bg-primary-yellow text-primary-navy font-semibold hover:bg-primary-yellow/90'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Usage examples:
// <YellowAccent variant="text">Highlighted text</YellowAccent>
// <YellowAccent variant="background">Background highlight</YellowAccent>
// <YellowAccent variant="border">Bordered element</YellowAccent>
// <YellowAccent variant="highlight">Important button</YellowAccent> 