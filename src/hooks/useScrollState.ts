import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has been scrolled past a threshold.
 * Shared by Navbar and App to avoid duplicating the scroll listener.
 */
export function useScrollState(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold)
    }

    onScroll() // initial check
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
