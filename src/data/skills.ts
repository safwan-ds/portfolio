/**
 * skills.ts — Skill categories and their skills.
 * Category titles: i18n keys (skills.categories.<key>.title)
 * Skill names: i18n keys (skills.categories.<catKey>.skills.<skillKey>)
 * Component falls back to the raw key as display text if no translation exists.
 */

export interface SkillItem {
  /** i18n key under skills.categories.<catKey>.skills.<key> */
  key: string
}

export interface SkillCategory {
  /** i18n key for category title: skills.categories.<key>.title */
  key: string
  icon: 'cpu' | 'code' | 'command' | 'brush'
  accent: 'neon-cyan' | 'neon-blue' | 'neon-purple' | 'neon-green'
  skills: readonly SkillItem[]
}

const skills: readonly SkillCategory[] = [
  {
    key: 'hardware',
    icon: 'cpu',
    accent: 'neon-cyan',
    skills: [
      { key: 'circuit_analysis' },
      { key: 'embedded_systems' },
      { key: 'signal_processing' },
      { key: 'control_systems' },
      { key: 'arduino' },
      { key: 'matlab_simulink' },
      { key: 'iot_sensors' },
      { key: 'latex' },
    ],
  },
  {
    key: 'ai',
    icon: 'code',
    accent: 'neon-blue',
    skills: [
      { key: 'python' },
      { key: 'pytorch' },
      { key: 'machine_learning' },
      { key: 'llm_apis' },
      { key: 'hermes_agent' },
    ],
  },
  {
    key: 'software',
    icon: 'command',
    accent: 'neon-purple',
    skills: [
      { key: 'c_cpp' },
      { key: 'typescript' },
      { key: 'html_css' },
      { key: 'react' },
      { key: 'tailwind_css' },
      { key: 'vite' },
      { key: 'git_github' },
      { key: 'docker' },
      { key: 'linux_bash' },
      { key: 'vs_code' },
    ],
  },
  {
    key: 'creative',
    icon: 'brush',
    accent: 'neon-green',
    skills: [
      { key: 'blender' },
      { key: 'after_effects' },
      { key: 'premiere_pro' },
      { key: 'illustrator' },
      { key: 'godot_engine' },
      { key: 'game_design' },
    ],
  },
]

export default skills
