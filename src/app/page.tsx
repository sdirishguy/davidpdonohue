import TestAnimation from '@/components/TestAnimation'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">
        🚀 Personal Portfolio
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-md mb-8">
        Building something amazing with Next.js, TypeScript, and Tailwind CSS v4
      </p>
      
      <TestAnimation />
      
      <div className="mt-8 px-6 py-3 bg-cyan-500 text-slate-900 rounded-lg font-semibold hover:bg-cyan-400 transition-colors cursor-pointer">
        Coming Soon
      </div>
    </main>
  )
}
