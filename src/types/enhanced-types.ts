export interface BaseComponent {
  className?: string
  children?: React.ReactNode
  'data-testid'?: string
}

// Enhanced form types with strict validation
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  isHumanVerified: boolean
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
  isHumanVerified?: string
}

export interface FormState {
  data: ContactFormData
  errors: FormErrors
  isSubmitting: boolean
  isSubmitted: boolean
}

// Project types with better structure
export interface ProjectLink {
  label: string
  url: string
  type: 'github' | 'demo' | 'docs' | 'external'
}

export interface EnhancedProject {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  primaryLink: ProjectLink
  additionalLinks?: ProjectLink[]
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
  status: 'active' | 'completed' | 'archived'
  featured: boolean
  category: 'web' | 'mobile' | 'desktop' | 'library' | 'tool'
}

// Professional experience types
export interface Achievement {
  description: string
  impact?: string
  metrics?: string
}

export interface ProfessionalExperience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  achievements: Achievement[]
  technologies: string[]
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
}

// Animation types
export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
}

export interface TerminalLineConfig {
  text: string
  color: string
  type: 'greeting' | 'intro' | 'body' | 'narrative'
  delay?: number
}
