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
  icon: 'cpu' | 'wrench' | 'signal' | 'sparkles' | 'globe' | 'command' | 'puzzle' | 'film'
  accent: 'neon-cyan' | 'neon-blue' | 'neon-purple' | 'neon-green'
  skills: readonly SkillItem[]
}

const skills: readonly SkillCategory[] = [
  {
    key: 'circuit_analysis',
    icon: 'cpu',
    accent: 'neon-cyan',
    skills: [{ key: 'proteus' }, { key: 'cst_studio' }, { key: 'psim' }],
  },
  {
    key: 'embedded_systems',
    icon: 'wrench',
    accent: 'neon-cyan',
    skills: [{ key: 'arduino' }, { key: 'iot_sensors' }],
  },
  {
    key: 'signal_processing',
    icon: 'signal',
    accent: 'neon-cyan',
    skills: [{ key: 'matlab_simulink' }],
  },
  {
    key: 'machine_learning',
    icon: 'sparkles',
    accent: 'neon-blue',
    skills: [{ key: 'python' }, { key: 'pytorch' }, { key: 'llm_apis' }, { key: 'ai_agents' }],
  },
  {
    key: 'web_development',
    icon: 'globe',
    accent: 'neon-purple',
    skills: [
      { key: 'typescript' },
      { key: 'html_css' },
      { key: 'react' },
      { key: 'tailwind_css' },
      { key: 'vite' },
      { key: 'threejs_r3f' },
    ],
  },
  {
    key: 'devops',
    icon: 'command',
    accent: 'neon-purple',
    skills: [{ key: 'git_github' }, { key: 'docker' }, { key: 'linux_bash' }],
  },
  {
    key: 'game_design',
    icon: 'puzzle',
    accent: 'neon-green',
    skills: [{ key: 'godot_engine' }, { key: 'blender' }],
  },
  {
    key: 'multimedia',
    icon: 'film',
    accent: 'neon-green',
    skills: [{ key: 'after_effects' }, { key: 'premiere_pro' }, { key: 'illustrator' }],
  },
]

export default skills
