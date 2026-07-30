import './index.css'
import Navbar from './components/ui/Navbar'
import AIChat from './components/ai/AIChat'
import SocialBookmarks from './components/ui/SocialBookmarks'
import About from './components/ui/About'
import Skills from './components/ui/Skills'
import Languages from './components/ui/Languages'
import Projects from './components/ui/Projects'
import Contact from './components/ui/Contact'
import Footer from './components/ui/Footer'
import Hero from './components/ui/Hero'
import Spinner from './components/ui/Spinner'
import { useDeviceTier } from './hooks/useDeviceTier'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

/* Signal preloader that React has mounted — now handled by Hero.tsx
   which waits for the logo image to load AND the shader to init
   before calling window._preloaderReady(). */

/* ── Font-loading gate on language switch ──
   When the user switches language, CSS :lang() selectors activate
   different font-families (Changa for AR, Rajdhani for TR).
   Google Fonts uses unicode-range CSS subsetting — each family has
   multiple @font-face rules per unicode range. Scanning
   document.fonts for FontFace.status won't catch subsets that still
   need downloading (the family already appears "loaded" from a
   previously cached subset).

   We use document.fonts.load(fontSpec, text) instead, which
   explicitly triggers download of the specific unicode-range subset
   needed for the given sample text.                                */

// Language → font-family + sample text that hits the right unicode range
const fontSpecMap: Record<string, { family: string; text: string }> = {
  ar: { family: 'Changa', text: 'مرحبا' },
  tr: { family: 'Rajdhani', text: 'ĞğŞşçöüİıÇÖÜ' },
  en: { family: 'Rajdhani', text: 'SAFWAN' },
}

export default function App() {
  const { isMobile } = useDeviceTier()
  const { i18n } = useTranslation()
  const [fontLoading, setFontLoading] = useState(false)
  const fontLoadRef = useRef<number>(0)

  useEffect(() => {
    function onLanguageChange() {
      const id = ++fontLoadRef.current
      setFontLoading(true)

      const lang = i18n.language
      const spec = fontSpecMap[lang] ?? fontSpecMap.en
      const fontSpec = `1em ${spec.family}`

      // Timeout fallback so the overlay never gets permanently stuck
      const timeoutId = setTimeout(() => {
        if (id === fontLoadRef.current) setFontLoading(false)
      }, 5000)

      const finish = () => {
        clearTimeout(timeoutId)
        // One frame for the browser to swap glyphs
        requestAnimationFrame(() => {
          if (id === fontLoadRef.current) setFontLoading(false)
        })
      }

      if (typeof document !== 'undefined' && document.fonts?.load) {
        // Explicitly trigger download of the unicode-range subset
        // matching `spec.text` for the target font family.
        document.fonts.load(fontSpec, spec.text).then(finish, finish)
      } else {
        // Fallback for environments without FontFaceSet
        requestAnimationFrame(() => {
          requestAnimationFrame(finish)
        })
      }
    }

    i18n.on('languageChanged', onLanguageChange)
    return () => {
      i18n.off('languageChanged', onLanguageChange)
    }
  }, [i18n])

  return (
    <div className="relative bg-void text-text-primary font-body overflow-x-hidden">
      {/* Page content */}
      <Navbar />
      <div className="relative z-10 pointer-events-none">
        <Hero />
        <About />
        <Skills />
        <Languages />
        <Projects />
        <Contact />
        <Footer />
      </div>
      {!isMobile && <AIChat />}
      {!isMobile && <SocialBookmarks />}

      {/* ── Font-loading overlay ── */}
      <div
        className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-void/85 backdrop-blur-sm transition-opacity duration-300 ${
          fontLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!fontLoading}
      >
        <Spinner size="w-8 h-8" />
        <p className="mt-3 font-mono text-[11px] tracking-widest uppercase text-text-secondary/50">
          Loading fonts…
        </p>
      </div>
    </div>
  )
}
