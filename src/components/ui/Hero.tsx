import { Suspense, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { LiquidMetal } from '@paper-design/shaders-react'

import ShapeGrid from './ShapeGrid'
import { cssColor } from '../../utils/constants'

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const clipBottom = useTransform(scrollYProgress, (progress) => `${progress * 100}%`)
  const contentY = useTransform(scrollYProgress, (progress) => `${-progress * 30}vh`)
  const clipPath = useMotionTemplate`inset(0 0 ${clipBottom} 0)`

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ clipPath }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <ShapeGrid
            speed={0.5}
            squareSize={65}
            direction="diagonal"
            borderColor="#333"
            hoverFillColor="#C084FF"
            shape="square"
            hoverTrailAmount={5}
          />
        </div>
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6"
          style={{ y: contentY, willChange: 'transform' }}
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-4">
            <Suspense fallback={<div style={{ width: 150, height: 200 }} />}>
              <LiquidMetalReady />
            </Suspense>

            <h1 className="font-hero-display text-7xl sm:text-8xl md:text-9xl select-none animate-glitch">
              <span className="text-white">{t('hero.title')}</span>
            </h1>
          </div>
          <p className="font-display text-xl text-slate-200 sm:text-2xl md:text-3xl select-none">
            {t('hero.subtitle')}
          </p>
          <p className="mt-6 mx-auto max-w-md font-body text-sm text-slate-300 sm:text-base">
            {t('hero.description')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
