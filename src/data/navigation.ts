/**
 * navigation.ts — Navbar link configuration.
 * Each entry maps to a section id and an i18n key.
 */

import type { IconType } from 'react-icons'
import {
  HiOutlineBriefcase,
  HiOutlineCodeBracket,
  HiOutlineEnvelope,
  HiOutlineLanguage,
  HiOutlineUser,
} from 'react-icons/hi2'

export interface NavItem {
  /** Section id (matches the id attribute on <section>) */
  id: string
  /** i18n key in nav.* namespace */
  labelKey: string
  /** Optional icon — rendered instead of text when set */
  icon?: IconType
}

const navigation: readonly NavItem[] = [
  { id: 'about', labelKey: 'nav.about', icon: HiOutlineUser },
  { id: 'skills', labelKey: 'nav.skills', icon: HiOutlineCodeBracket },
  { id: 'languages', labelKey: 'nav.languages', icon: HiOutlineLanguage },
  { id: 'projects', labelKey: 'nav.projects', icon: HiOutlineBriefcase },
  { id: 'contact', labelKey: 'nav.contact', icon: HiOutlineEnvelope },
]

export default navigation
