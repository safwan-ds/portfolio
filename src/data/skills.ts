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
  icon: 'chip' | 'terminal' | 'cog'
  accent: 'neon-cyan' | 'neon-blue' | 'neon-purple'
  skills: readonly SkillItem[]
}

const skills: readonly SkillCategory[] = [
  {
    key: 'electrical',
    icon: 'chip',
    accent: 'neon-cyan',
    skills: [
      { key: 'circuit_analysis' },
      { key: 'embedded_systems' },
      { key: 'signal_processing' },
      { key: 'control_systems' },
      { key: 'arduino_stm32' },
      { key: 'matlab_simulink' },
      { key: 'verilog_fpga' },
      { key: 'iot_sensors' },
    ],
  },
  {
    key: 'software',
    icon: 'terminal',
    accent: 'neon-blue',
    skills: [
      { key: 'typescript' },
      { key: 'react_nextjs' },
      { key: 'threejs_r3f' },
      { key: 'python' },
      { key: 'c_cpp' },
      { key: 'tailwind_css' },
      { key: 'nodejs' },
      { key: 'gdscript_godot' },
    ],
  },
  {
    key: 'tools',
    icon: 'cog',
    accent: 'neon-purple',
    skills: [
      { key: 'git_github' },
      { key: 'vs_code' },
      { key: 'godot_engine' },
      { key: 'blender' },
      { key: 'docker' },
      { key: 'linux_bash' },
      { key: 'llm_apis' },
      { key: 'obsidian' },
    ],
  },
]

export default skills
