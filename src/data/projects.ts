/**
 * projects.ts — Project showcase entries.
 * Keys reference i18n keys in locale files under projects.items.<key>.
 * Edit this + the locale files to add/modify projects.
 */

export interface Project {
  key: string
  tags: readonly string[]
  link?: string
  github?: string
  image?: string
}

const projects: readonly Project[] = [
  {
    key: 'portfolio',
    tags: ['react', 'tailwind_css', 'i18n', 'paper_shaders'],
    github: 'https://github.com/safwan-ds/portfolio',
    image: '/portfolio/images/projects/portfolio.png',
  },
  {
    key: 'sign2speech',
    tags: ['arduino', 'python', 'signal_processing', 'embedded'],
    github: 'https://github.com/safwan-ds/sign2speech',
    image: '/portfolio/images/projects/sign2speech.jpg',
  },
  {
    key: 'boost_converter_pwm',
    tags: ['arduino', 'power_electronics'],
    github: 'https://github.com/safwan-ds/boost_converter_pwm',
    image: '/portfolio/images/projects/boost_circuit.jpg',
  },
  {
    key: 'astrododge-pygame',
    tags: ['python', 'pygame', 'game_design'],
    github: 'https://github.com/safwan-ds/AstroDodgePygame',
    image: '/portfolio/images/projects/astrododge-pygame.png',
  },
]

export default projects
