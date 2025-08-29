'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, hasIntersected] and only flips to true once (then disconnects).
 */
export function useInViewOnce<T extends Element = Element>(
  options: IntersectionObserverInit = { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
) {
  const ref = useRef<T | null>(null)
  const [hasIntersected, set] = useState(false)

  useEffect(() => {
    if (!ref.current || hasIntersected) return
    const node = ref.current

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          set(true)
        }
      })
    }, options)

    io.observe(node)
    return () => io.unobserve(node)
  }, [hasIntersected, options])

  return [ref, hasIntersected] as const
}
