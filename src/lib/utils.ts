import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

/**
 * Debounce function for search/filter inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if we're running on the client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Safe localStorage access with SSR support
 */
export const storage = {
  get: (key: string): string | null => {
    if (!isClient) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key: string, value: string): void => {
    if (!isClient) return
    try {
      localStorage.setItem(key, value)
    } catch {
      // Silently fail
    }
  },
  remove: (key: string): void => {
    if (!isClient) return
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  }
}

export function getTerminalPath(pathname: string): string {
  // Normalize the pathname to handle trailing slashes and different formats
  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  
  const pathMap: Record<string, string> = {
    '/': '/Home',
    '/about': '/Personal',
    '/professional': '/Professional', 
    '/projects': '/Projects',
    '/content': '/Content',
    '/contact': '/Contact'
  }
  
  return pathMap[normalizedPath] || '/Home'
}

// Centralized font size configuration for typing animations
export function getTypingFontSize(lineType: 'greeting' | 'intro' | 'body' | 'narrative' | string): string {
  switch (lineType) {
    case 'greeting':
      return "text-2xl md:text-2xl lg:text-3xl font-bold";
    case 'intro':
      return "text-2xl font-bold";
    case 'body':
      return "text-2xl font-bold";
    case 'narrative':
      return "text-2xl font-bold";
    default:
      return "text-2xl font-bold";
  }
}

// Helper function to get text content from any line object
export function getLineText(line: { greeting?: string, intro?: string, body?: string, narrative?: string, text?: string }): string {
  return line.greeting || line.intro || line.body || line.narrative || line.text || '';
}

// Helper function to get color from line object
export function getLineColor(line: { color?: string }): string {
  return line.color || 'text-primary-blue';
}
