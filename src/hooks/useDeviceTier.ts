import { useEffect, useState } from 'react'

const BREAKPOINT = 768
const LOW_MEMORY = 4
const LOW_CORES = 4

interface DeviceTier {
  isMobile: boolean
  isLowEnd: boolean
  isReduced: boolean
}

function checkMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < BREAKPOINT
}

function checkLowEnd(): boolean {
  if (typeof navigator === 'undefined') return false
  const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (ram !== undefined && ram <= LOW_MEMORY) return true
  const cores = navigator.hardwareConcurrency
  return cores !== undefined && cores <= LOW_CORES
}

export function useDeviceTier(): DeviceTier {
  const [isMobile, setIsMobile] = useState(checkMobile)
  const [isLowEnd] = useState(checkLowEnd)
  const isReduced = isMobile || isLowEnd

  useEffect(() => {
    const onResize = () => setIsMobile(checkMobile())
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return { isMobile, isLowEnd, isReduced }
}
