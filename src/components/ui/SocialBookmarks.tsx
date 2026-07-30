/**
 * SocialBookmarks — Fixed sidebar of vertical bookmark-shaped social links.
 *
 * LTR  → left edge, right-pointing tabs, expand rightward on hover.
 * RTL  → right edge, left-pointing tabs, expand leftward on hover.
 * Width auto-fits the label length via max-width transition + fit-content.
 * Hidden on mobile (matches AIChat pattern).
 */

import { useState } from 'react'
import { socials } from '../../data'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { useRtl } from '../../hooks/useRtl'

/** Fixed depth of the triangular point, in px */
const PT = 14

export default function SocialBookmarks() {
  const { isMobile } = useDeviceTier()
  const isRtl = useRtl()
  const [hovered, setHovered] = useState<string | null>(null)

  if (isMobile) return null

  const onEnter = (label: string) => setHovered(label)
  const onLeave = () => setHovered(null)

  return (
    <nav
      className={`fixed ${isRtl ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0.5`}
      aria-label="Social links"
    >
      {socials.map((social) => {
        const Icon = social.icon
        const active = hovered === social.label
        const hoverBg = social.bgColor ?? '#4a5e8a'

        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            onMouseEnter={() => onEnter(social.label)}
            onMouseLeave={onLeave}
            onFocus={() => onEnter(social.label)}
            onBlur={onLeave}
            className="flex items-center h-11 no-underline cursor-pointer overflow-hidden transition-all duration-200 ease-out"
            style={{
              maxWidth: active ? 300 : 48,
              width: 'fit-content',
              minWidth: 48,
              backgroundColor: active ? hoverBg : '#31466e',
              clipPath: isRtl
                ? `polygon(${PT}px 0, 100% 0, 100% 100%, ${PT}px 100%, 0 50%)`
                : `polygon(0 0, calc(100% - ${PT}px) 0, 100% 50%, calc(100% - ${PT}px) 100%, 0 100%)`,
            }}
          >
            {/* Icon — always visible, shifted toward the page edge so the
                bookmark's triangular cut doesn't throw off visual centering */}
            <span className="flex items-center justify-center w-10 h-11 shrink-0">
              <Icon className="w-4.5 h-4.5 text-text-primary" />
            </span>

            {/* Label — hidden by default, fades in on hover.
                paddingInlineStart gives breathing room after the icon,
                paddingInlineEnd keeps text clear of the triangular point
                (logical: left/right swap automatically in RTL). */}
            <span
              className="font-mono text-[11px] tracking-wider whitespace-nowrap transition-all duration-200"
              style={{
                color: '#fff0d9',
                opacity: active ? 1 : 0,
                paddingInlineStart: active ? 10 : 0,
                paddingInlineEnd: active ? 26 : 0,
              }}
            >
              {social.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
