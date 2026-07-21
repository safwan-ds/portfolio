/**
 * data/index.ts — barrel re-export for all data files.
 * Import from '@/data' to access all content config.
 *
 * Example:
 *   import { profile, skills, projects, socials, navigation } from '@/data'
 */

export { default as profile } from './profile'
export type { Profile } from './profile'

export { default as navigation } from './navigation'
export type { NavItem } from './navigation'

export { default as skills } from './skills'
export type { SkillCategory } from './skills'

export { default as projects } from './projects'
export type { Project } from './projects'

export { default as socials } from './socials'
export type { SocialLink } from './socials'

export { default as languages } from './languages'
export type { Language } from './languages'
