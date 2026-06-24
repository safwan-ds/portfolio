/**
 * useMediaQuery — reactive hook for CSS media queries.
 * Returns true if the query matches the current viewport.
 */

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    function onChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
