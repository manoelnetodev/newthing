import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = '120px'): boolean {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting)
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
