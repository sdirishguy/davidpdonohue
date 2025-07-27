import Layout from '@/components/layout/Layout'
import ComponentShowcase from '@/components/ComponentShowcase'

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            🚀 Personal Portfolio
          </h1>
          <p className="text-lg text-gray-300">
            Building with Next.js, TypeScript, and Tailwind CSS v4
          </p>
        </div>
        
        <ComponentShowcase />
      </div>
    </Layout>
  )
}
