/**
 * socials.ts — Social media links shown in Contact section.
 * URLs are derived from profile.ts to keep them in sync.
 */

import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaUpwork } from 'react-icons/fa6'
import FiverrIcon from './FiverrIcon'
import profile from './profile'

export interface SocialLink {
  label: string
  href: string
  icon: IconType
  hoverColor: string
}

const socials: readonly SocialLink[] = [
  {
    label: 'GitHub',
    href: `https://github.com/${profile.github}`,
    icon: FaGithub,
    hoverColor: 'hover:text-white',
  },
  {
    label: 'LinkedIn',
    href: `https://linkedin.com/in/${profile.linkedin}`,
    icon: FaLinkedin,
    hoverColor: 'hover:text-[#0A66C2]',
  },
  {
    label: 'Upwork',
    href: `https://upwork.com/freelancers/${profile.upwork}`,
    icon: FaUpwork,
    hoverColor: 'hover:text-[#108A00]',
  },
  {
    label: 'Fiverr',
    href: `https://www.fiverr.com/s/${profile.fiverr}`,
    icon: FiverrIcon,
    hoverColor: 'hover:text-[#1DBF73]',
  },
]

export default socials
