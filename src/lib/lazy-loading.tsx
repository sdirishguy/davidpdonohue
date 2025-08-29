import dynamic from 'next/dynamic'

// Lazy load heavy sections
export const LazyAboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
    </div>
  ),
  ssr: false
})

export const LazyProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), {
  loading: () => <div className="min-h-96 bg-primary-navy animate-pulse"></div>
})

export const LazyContentSection = dynamic(() => import('@/components/sections/ContentSection'), {
  loading: () => <div className="min-h-96 bg-primary-navy animate-pulse"></div>
})
