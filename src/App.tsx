import './index.css'
import Navbar from './components/ui/Navbar'
import AIChat from './components/ai/AIChat'
import About from './components/ui/About'
import Skills from './components/ui/Skills'
import Languages from './components/ui/Languages'
import Projects from './components/ui/Projects'
import Contact from './components/ui/Contact'
import Footer from './components/ui/Footer'
import Hero from './components/ui/Hero'
import { useDeviceTier } from './hooks/useDeviceTier'

export default function App() {
  const { isMobile } = useDeviceTier()

  return (
    <div className="relative bg-void text-text-primary font-body overflow-x-hidden">
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
    </div>
  )
}
