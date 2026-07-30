/**
 * socials.ts — Social media links shown in Contact section.
 * URLs are derived from profile.ts to keep them in sync.
 */

import type { IconType } from 'react-icons'
import { FaGithub, FaInstagram, FaLinkedin, FaUpwork, FaYoutube } from 'react-icons/fa6'
import profile from './profile'

export interface SocialLink {
  label: string
  href: string
  icon: IconType
  hoverColor: string
  bgColor: string
}

const socials: readonly SocialLink[] = [
  {
    label: 'YouTube',
    href: `https://www.youtube.com/${profile.youtube}`,
    icon: FaYoutube,
    hoverColor: 'hover:text-[#FF0000]',
    bgColor: '#FF0000',
  },
  {
    label: 'Instagram',
    href: `https://www.instagram.com/${profile.instagram}`,
    icon: FaInstagram,
    hoverColor: 'hover:text-[#c13584]',
    bgColor: '#c13584',
  },
  {
    label: 'GitHub',
    href: `https://github.com/${profile.github}`,
    icon: FaGithub,
    hoverColor: 'hover:text-white',
    bgColor: '#24292e',
  },
  {
    label: 'LinkedIn',
    href: `https://linkedin.com/in/${profile.linkedin}`,
    icon: FaLinkedin,
    hoverColor: 'hover:text-[#0A66C2]',
    bgColor: '#0A66C2',
  },
  {
    label: 'Upwork',
    href: `https://upwork.com/freelancers/${profile.upwork}`,
    icon: FaUpwork,
    hoverColor: 'hover:text-[#108A00]',
    bgColor: '#108A00',
  },
]

export default socials
