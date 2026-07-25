import profile from './profile'
import skills from './skills'
import projects from './projects'
import socials from './socials'
import languages from './languages'

function fmt(s: string): string {
  return s
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function buildKnowledgeBase(t?: (key: string) => string): string {
  const tr = (key: string, fallback: string) => (t ? t(key) : fallback)

  const l: string[] = []

  l.push(`${tr('about.name_label', 'Name')}: ${profile.name}`)
  l.push(`${tr('hero.subtitle', 'Title')}: ${profile.title}`)
  l.push(`${tr('about.location_label', 'Location')}: ${profile.location}`)
  l.push(`${tr('about.education_label', 'Education')}: ${profile.education}, ${profile.school}`)
  l.push(`Email: ${profile.email}`)
  l.push('')

  const INTEREST_LABELS: Record<string, string> = {
    ai: 'AI & Machine Learning',
    nn: 'Neural Networks',
    ml: 'Machine Learning',
    llm: 'LLMs & Agents',
    embedded: 'Embedded Systems',
    signal: 'Signal Processing',
    control: 'Control Systems',
    game: 'Game Development',
    '3d': '3D Graphics',
  }
  const interests = profile.interestKeys.map((k) =>
    tr(`about.interests.${k}`, INTEREST_LABELS[k] || fmt(k)),
  )
  l.push(`${tr('about.interests_label', 'Interests')}: ${interests.join(', ')}`)
  l.push('')

  l.push(`${tr('skills.label', 'Skills')}:`)
  for (const cat of skills) {
    const title = tr(`skills.categories.${cat.key}.title`, fmt(cat.key))
    const items = cat.skills
      .map((s) => tr(`skills.categories.${cat.key}.skills.${s.key}`, fmt(s.key)))
      .join(', ')
    l.push(`- ${title}: ${items}`)
  }
  l.push('')

  l.push(`${tr('languages.label', 'Languages')}:`)
  for (const lang of languages) {
    const name = tr(`languages.items.${lang.key}`, fmt(lang.key))
    const level = tr(`languages.levels.${lang.levelKey}`, fmt(lang.levelKey))
    l.push(`- ${name}: ${level}`)
  }
  l.push('')

  l.push('Projects:')
  for (const proj of projects) {
    const title = tr(`projects.items.${proj.key}.title`, fmt(proj.key))
    const tags = proj.tags.map((t) => tr(`projects.tags.${t}`, fmt(t))).join(', ')
    l.push(`- ${title} (${tags})`)
    if (proj.github) l.push(`  ${tr('contact.find_me', 'Link')}: ${proj.github}`)
  }
  l.push('')

  l.push('Social Links:')
  for (const soc of socials) {
    l.push(`- ${soc.label}: ${soc.href}`)
  }

  return l.join('\n')
}

export function buildSystemPrompt(t?: (key: string) => string): string {
  const persona = t
    ? t('ai_chat.system_prompt')
    : "You are an AI assistant on Safwan Emad's portfolio website. Answer questions about Safwan's skills, projects, background, and experience using the information below. Be concise, friendly, and professional. If asked something not covered below, say you don't know rather than guessing."

  return [persona, '', '--- KNOWLEDGE BASE ---', buildKnowledgeBase(t)].join('\n')
}
