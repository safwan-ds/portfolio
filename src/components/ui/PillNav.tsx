import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { IconType } from 'react-icons'

export interface PillNavItem {
  label: string
  href: string
  ariaLabel?: string
  icon?: IconType
}

export interface PillNavProps {
  items: PillNavItem[]
  _activeHref?: string
  className?: string
  style?: React.CSSProperties
  ease?: string
  baseColor?: string
  pillColor?: string
  hoveredPillTextColor?: string
  pillTextColor?: string
  onNavigate?: (href: string) => void
}

export default function PillNav({
  items,
  _activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#ffffff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onNavigate,
  style,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? baseColor
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])

  const layout = useCallback(() => {
    circleRefs.current.forEach((circle) => {
      if (!circle?.parentElement) return

      const pill = circle.parentElement as HTMLElement
      const rect = pill.getBoundingClientRect()
      const { width: w, height: h } = rect
      if (w === 0 || h === 0) return

      const R = ((w * w) / 4 + h * h) / (2 * h)
      const D = Math.ceil(2 * R) + 2
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
      const originY = D - delta

      circle.style.width = `${D}px`
      circle.style.height = `${D}px`
      circle.style.bottom = `-${delta}px`

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      })

      const label = pill.querySelector<HTMLElement>('.pill-label')
      const white = pill.querySelector<HTMLElement>('.pill-label-hover')

      if (label) gsap.set(label, { y: 0 })
      if (white) gsap.set(white, { y: h + 12, opacity: 0 })

      const index = circleRefs.current.indexOf(circle)
      if (index === -1) return

      tlRefs.current[index]?.kill()
      const tl = gsap.timeline({ paused: true })

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0)

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 })
        tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0)
      }

      tlRefs.current[index] = tl
    })
  }, [ease])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    layout()

    const ro = new ResizeObserver(() => {
      layout()
    })
    if (containerRef.current) ro.observe(containerRef.current)

    if (document.fonts) {
      document.fonts.ready
        .then(() => {
          layout()
        })
        .catch(() => {})
    }
    return () => ro.disconnect()
  }, [items, layout])

  // Scroll-spy: tween timeline progress for smooth enter + exit transitions
  const prevActiveRef = useRef(_activeHref)

  useEffect(() => {
    const prev = prevActiveRef.current
    prevActiveRef.current = _activeHref

    items.forEach((item, i) => {
      const tl = tlRefs.current[i]
      if (!tl) return

      const isNewActive = _activeHref === item.href
      const wasActive = prev === item.href

      if (isNewActive && tl.progress() < 1) {
        gsap.to(tl, {
          progress: 1,
          duration: 0.35,
          ease,
          overwrite: 'auto',
        })
      } else if (wasActive && tl.progress() > 0) {
        gsap.to(tl, {
          progress: 0,
          duration: 0.35,
          ease,
          overwrite: 'auto',
        })
      }
    })
  }, [_activeHref, items, ease])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    })
  }

  const handleClick = (href: string) => {
    onNavigate?.(href)
  }

  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handler = (e: MediaQueryListEvent) => setCompact(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: compact ? '30px' : '36px',
    ['--pill-pad-x']: compact ? '10px' : '16px',
    ['--pill-gap']: compact ? '2px' : '3px',
  } as React.CSSProperties

  return (
    <div
      ref={containerRef}
      className={`relative items-center flex ${compact ? 'w-full' : 'rounded-full'} ${className}`}
      style={{
        height: 'var(--nav-h)',
        background: 'var(--base)',
        ...cssVars,
        ...style,
      }}
    >
      <ul
        role="menubar"
        className={`list-none flex items-stretch m-0 p-[3px] h-full ${compact ? 'w-full justify-between' : ''}`}
        style={{ gap: compact ? '6px' : 'var(--pill-gap)' }}
      >
        {items.map((item, i) => {
          const pillStyle: React.CSSProperties = {
            background: 'var(--pill-bg)',
            color: 'var(--pill-text)',
            paddingLeft: compact ? '8px' : 'var(--pill-pad-x)',
            paddingRight: compact ? '8px' : 'var(--pill-pad-x)',
            fontSize: compact ? '11px' : undefined,
          }

          return (
            <li key={item.href} role="none" className="flex h-full">
              <a
                role="menuitem"
                href={item.href}
                className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] leading-[0] uppercase tracking-[0.5px] whitespace-nowrap cursor-pointer px-0"
                style={pillStyle}
                aria-label={item.ariaLabel || item.label}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => {
                  if (_activeHref !== item.href) {
                    handleLeave(i)
                  }
                }}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(item.href)
                }}
              >
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{
                    background: 'var(--base)',
                    willChange: 'transform',
                  }}
                  aria-hidden="true"
                  ref={(el) => {
                    circleRefs.current[i] = el
                  }}
                />
                <span className="label-stack relative inline-block leading-[1] z-[2]">
                  {compact && item.icon ? (
                    <item.icon className="w-4 h-4" />
                  ) : (
                    <>
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: 'transform' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: 'var(--hover-text)',
                          willChange: 'transform, opacity',
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
