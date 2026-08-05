import { Suspense, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { easeInOut, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { LiquidMetal } from '@paper-design/shaders-react'

import ShapeGrid from './ShapeGrid'
import { useMotionPref } from '../../hooks/useMotionPref'
import { cssColor, HERO_WIPE_EXTRA_VH, WIPE_OVERLAP_VH } from '../../utils/constants'

const LOGO_URL = `${import.meta.env.BASE_URL}images/logo.svg`

function LiquidMetalReady() {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window._preloaderReady?.()
      })
    })
  }, [])

  return (
    <LiquidMetal
      width={150}
      height={200}
      image={LOGO_URL}
      suspendWhenProcessingImage
      colorBack="#FFFFFF00"
      colorTint={cssColor('peach')}
      repetition={1.5}
      softness={1}
      shiftRed={0}
      shiftBlue={0}
      distortion={0}
      contour={0.8}
      angle={70}
      speed={1}
      scale={1}
      fit="contain"
    />
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const { motionEnabled } = useMotionPref()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // HERO_WIPE_EXTRA_VH extends the window past the hero bottom so the
    // wipe + parallax complete more slowly. The wipe still reaches 100%
    // exactly as the hero exits the viewport (1 / (1 + extra) of the window).
    offset: ['start start', `end -${HERO_WIPE_EXTRA_VH * 100}vh`],
  })

  const clipBottom = useTransform(scrollYProgress, [0, 1], ['0%', '100%'], {
    ease: easeInOut,
  })
  const contentY = useTransform(scrollYProgress, (progress) => `${-progress * 30}vh`)
  const clipPath = useMotionTemplate`inset(0 0 ${clipBottom} 0)`

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative z-50 flex min-h-screen flex-col items-center justify-center overflow-hidden"
      // Negative bottom margin pulls the About section up so its top 30vh
      // sits UNDERNEATH the hero — revealed progressively as the wipe edge
      // passes over it (hero must stay z-10 above About).
      // Only when wipe motion is enabled; otherwise About flows normally.
      style={{
        marginBottom: motionEnabled ? `${-WIPE_OVERLAP_VH * 100}vh` : undefined,
      }}
    >
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-void"
        style={{ clipPath: motionEnabled ? clipPath : 'inset(0 0 0 0)' }}
      >
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true">
          <ShapeGrid
            speed={0.5}
            squareSize={65}
            cellHeight={110}
            direction="diagonal"
            borderColor="#333"
            hoverFillColor="#ffffff"
            shape="logo"
            logoUrl={LOGO_URL}
            hoverTrailAmount={5}
          />
        </div>
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6"
          style={motionEnabled ? { y: contentY, willChange: 'transform' } : undefined}
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-4">
            <Suspense fallback={<div style={{ width: 150, height: 200 }} />}>
              <LiquidMetalReady />
            </Suspense>

            <h1 className="font-hero-display text-7xl sm:text-8xl md:text-9xl select-none animate-glitch">
              <span className="text-white">{t('hero.title')}</span>
            </h1>
          </div>
          <p className="font-display text-xl text-white sm:text-2xl md:text-3xl select-none">
            {t('hero.subtitle')}
          </p>
          <p className="mt-6 mx-auto max-w-md font-body text-sm text-white/85 sm:text-base">
            {t('hero.description')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
