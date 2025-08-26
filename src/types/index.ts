// Global TypeScript type definitions

// Common types
export interface BaseComponent {
  className?: string
  children?: React.ReactNode
}

// Content types (we'll expand these later)
export interface PersonalContent {
  bio: string
  interests: string[]
  favoriteBooks: Book[]
}

export interface Book {
  title: string
  author: string
  amazonLink?: string
  audibleLink?: string
  description: string
}

export interface Project {
  id: string
  title: string
  shortDescription: string
  longDescription: string
  technologies: string[]
  thumbnail: string
  screenshots: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  demoType: 'iframe' | 'interactive' | 'video' | 'playground'
  demoConfig?: Record<string, unknown>
}

// Professional types
export interface TimelineItem {
  type: 'job' | 'education'
  title: string
  company: string
  startDate: string
  endDate?: string
  shortDescription: string
  fullDescription: string
  achievements: string[]
  technologies: string[]
}

export interface Skill {
  name: string
  icon: string
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  experience: string
}

export interface SkillCategory {
  category: string
  items: Skill[]
}
