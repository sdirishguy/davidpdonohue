import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
  const pathMap: Record<string, string> = {
    '/': '/Home',
    '/about': '/Personal',
    '/professional': '/Professional', 
    '/projects': '/Projects',
    '/content': '/Content',
    '/contact': '/Contact'
  }
  
  return pathMap[pathname] || '/Home'
}
