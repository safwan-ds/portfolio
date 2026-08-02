/**
 * skills.ts — Skill categories and their skills.
 * Category titles: i18n keys (skills.categories.<key>.title)
 * Skill names: i18n keys (skills.categories.<catKey>.skills.<skillKey>)
 * Component falls back to the raw key as display text if no translation exists.
 */

import {
  HiOutlineCommandLine,
  HiOutlineCpuChip,
  HiOutlineFilm,
  HiOutlineGlobeAlt,
  HiOutlinePuzzlePiece,
  HiOutlineSignal,
  HiOutlineSparkles,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import {
  SiArduino,
  SiBlender,
  SiDocker,
  SiGit,
  SiGodotengine,
  SiLinux,
  SiProteus,
  SiPython,
  SiPytorch,
  SiRaspberrypi,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

// Brand logo SVGs — real logos from worldvectorlogo / wikimedia
import AfterEffectsSvg from '../assets/brand-logos/after_effects.svg?react'
import PremiereProSvg from '../assets/brand-logos/premiere_pro.svg?react'
import IllustratorSvg from '../assets/brand-logos/illustrator.svg?react'
import MatlabSvg from '../assets/brand-logos/matlab.svg?react'

export type IconComponent = React.ComponentType<{ className?: string }>

export interface SkillItem {
  /** i18n key under skills.categories.<catKey>.skills.<key> */
  key: string
  /** Brand logo or representative icon — omit for text-only */
  icon?: IconComponent
}

export interface SkillCategory {
  /** i18n key for category title: skills.categories.<key>.title */
  key: string
  icon: IconComponent
  accent: 'neon-cyan' | 'accent' | 'neon-purple' | 'neon-green'
  skills: readonly SkillItem[]
}

const skills: readonly SkillCategory[] = [
  {
    key: 'circuit_analysis',
    icon: HiOutlineCpuChip,
    accent: 'neon-cyan',
    skills: [{ key: 'proteus', icon: SiProteus }, { key: 'cst_studio' }, { key: 'psim' }],
  },
  {
    key: 'embedded_systems',
    icon: HiOutlineWrenchScrewdriver,
    accent: 'neon-cyan',
    skills: [
      { key: 'arduino', icon: SiArduino },
      { key: 'iot_sensors', icon: SiRaspberrypi },
    ],
  },
  {
    key: 'signal_processing',
    icon: HiOutlineSignal,
    accent: 'neon-cyan',
    skills: [{ key: 'matlab_simulink', icon: MatlabSvg }],
  },
  {
    key: 'machine_learning',
    icon: HiOutlineSparkles,
    accent: 'accent',
    skills: [
      { key: 'python', icon: SiPython },
      { key: 'pytorch', icon: SiPytorch },
      { key: 'llm_apis', icon: HiOutlineSparkles },
      { key: 'ai_agents', icon: HiOutlineCpuChip },
    ],
  },
  {
    key: 'web_development',
    icon: HiOutlineGlobeAlt,
    accent: 'neon-purple',
    skills: [
      { key: 'typescript', icon: SiTypescript },
      { key: 'html_css', icon: HiOutlineGlobeAlt },
      { key: 'react', icon: SiReact },
      { key: 'tailwind_css', icon: SiTailwindcss },
      { key: 'vite', icon: SiVite },
      { key: 'threejs_r3f', icon: SiThreedotjs },
    ],
  },
  {
    key: 'devops',
    icon: HiOutlineCommandLine,
    accent: 'neon-purple',
    skills: [
      { key: 'git_github', icon: SiGit },
      { key: 'docker', icon: SiDocker },
      { key: 'linux_bash', icon: SiLinux },
    ],
  },
  {
    key: 'game_design',
    icon: HiOutlinePuzzlePiece,
    accent: 'neon-green',
    skills: [
      { key: 'godot_engine', icon: SiGodotengine },
      { key: 'blender', icon: SiBlender },
    ],
  },
  {
    key: 'multimedia',
    icon: HiOutlineFilm,
    accent: 'neon-green',
    skills: [
      { key: 'after_effects', icon: AfterEffectsSvg },
      { key: 'premiere_pro', icon: PremiereProSvg },
      { key: 'illustrator', icon: IllustratorSvg },
    ],
  },
]

export default skills
