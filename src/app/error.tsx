'use client'

import * as React from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Hook up monitoring/logging here if desired
    console.error('Route error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] grid place-items-center bg-black text-white px-6">
      <div className="max-w-lg w-full p-6 border rounded">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="mb-4 opacity-80">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 border rounded hover:bg-white hover:text-black transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
