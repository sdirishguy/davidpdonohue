// Color palette for the portfolio
export const COLORS = {
  primary: {
    navy: '#0B1426',
    blue: '#22D3EE',
    magenta: '#EC4899',
    amber: '#F59E0B'
  },
  neutral: {
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  }
} as const

// Animation configurations
export const ANIMATIONS = {
  pageTransition: {
    duration: 0.3,
    ease: 'easeInOut'
  },
  stagger: {
    duration: 0.1
  },
  hover: {
    scale: 1.05,
    duration: 0.2
  }
} as const

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

// API endpoints (we'll use these later)
export const API_ENDPOINTS = {
  medium: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yourusername',
  youtube: 'https://www.googleapis.com/youtube/v3/search'
} as const

// Social links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  medium: 'https://medium.com/@yourusername',
  youtube: 'https://youtube.com/@yourusername'
} as const
