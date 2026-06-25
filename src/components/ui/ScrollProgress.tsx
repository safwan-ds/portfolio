import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate/20">
      <div
        className="h-full bg-linear-to-r from-neon-blue to-neon-purple transition-all duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
