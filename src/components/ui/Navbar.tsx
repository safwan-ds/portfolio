/**
 * Navbar — top on both desktop and mobile with GlassSurface.
 * Desktop: PillNav with full labels
 * Mobile: Icon bar with labels below
 */

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Logo from './Logo'
import GlassSurface from './GlassSurface'
import PillNav from './PillNav'
import { navigation } from '../../data'

export default function Navbar() {
  const { t } = useTranslation()

  const handleClick = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  const pillItems = useMemo(
    () =>
      navigation.map((item) => ({
        label: t(item.labelKey),
        href: `#${item.id}`,
        icon: item.icon,
      })),
    [t],
  )

  const handlePillNavigate = (href: string) => {
    const id = href.replace('#', '')
    handleClick(id)
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto py-2 mx-2 sm:mx-4"
    >
      <div className="w-full md:w-fit mx-auto px-2 md:px-0">
        <GlassSurface
          width="100%"
          borderRadius={12}
          borderWidth={0.04}
          brightness={50}
          opacity={0.92}
          blur={10}
          backgroundOpacity={0.08}
          saturation={1.3}
          distortionScale={-100}
          redOffset={2}
          greenOffset={6}
          blueOffset={12}
          mixBlendMode="overlay"
          style={{ minHeight: 64 }}
        >
          <div className="flex flex-col w-full">
            {/* Desktop navbar */}
            <div className="hidden md:flex items-center gap-2 px-4">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  handleClick('home')
                }}
                className="text-slate-200 hover:text-accent transition-colors select-none"
                aria-label="Home"
              >
                <Logo className="h-8 w-auto" color="currentColor" />
              </a>

              <PillNav
                items={pillItems}
                onNavigate={handlePillNavigate}
                baseColor="#C084FF"
                pillColor="rgba(255,255,255,0.85)"
                pillTextColor="#141E3A"
                hoveredPillTextColor="#ffffff"
                ease="power2.easeOut"
                className="ms-3"
                style={{ background: 'transparent' }}
              />
            </div>

            {/* Mobile navbar */}
            <div className="md:hidden flex items-center justify-between w-full px-2 py-2">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  handleClick('home')
                }}
                className="text-slate-200 hover:text-accent transition-colors select-none shrink-0"
                aria-label="Home"
              >
                <Logo className="h-6 w-auto" color="currentColor" />
              </a>
              <div className="flex-1 flex items-center justify-between overflow-x-hidden scrollbar-hide ms-2">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleClick(item.id)
                    }}
                    className="text-slate-200 hover:text-accent transition-colors font-mono uppercase tracking-wider text-center leading-tight min-w-0"
                    style={{
                      fontSize: 'clamp(7px,3vw, 13px)',
                      padding: '0 clamp(1px, 0.5vw, 4px)',
                    }}
                  >
                    {t(item.labelKey)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </motion.nav>
  )
}
