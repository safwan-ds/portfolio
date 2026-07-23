/**
 * profile.ts — Personal information shown in Hero + About + Contact.
 * Edit this file to update your name, bio, location, etc.
 * For multilingual text, use i18n keys (translation files in src/i18n/locales/).
 *
 * ⚠️  When changing location, education, or school here, also update the
 *     corresponding translations in all locale files (en.json / ar.json / tr.json):
 *       about.location_val
 *       about.education_val
 *       about.education_school
 */

export interface Profile {
  /** Display name (can be overridden per language via i18n key 'hero.title') */
  name: string
  /** Short tagline (can use i18n key 'hero.subtitle') */
  title: string
  /** Location string (can use i18n key 'about.location_val') */
  location: string
  /** Degree (can use i18n key 'about.education_val') */
  education: string
  /** University name (can use i18n key 'about.education_school') */
  school: string
  /** Email shown in Contact section */
  email: string
  /** GitHub username (for URLs) */
  github: string
  /** LinkedIn username (for URLs) */
  linkedin: string
  /** Upwork freelancer username (for URL) */
  upwork: string
  /** Fiverr freelancer id (for URL) */
  fiverr: string
  /** Interest i18n keys — each maps to about.interests.<key> in translations */
  interestKeys: readonly string[]
}

const profile: Profile = {
  name: 'Safwan Emad',
  title: 'EEE Student & AI Developer',
  location: 'Turkey / Kuwait',
  education: 'B.Sc. Electrical & Electronics Engineering',
  school: 'Erzincan Binali Yıldırım University',
  email: 'safwanemad2002@gmail.com',
  github: 'safwan-ds',
  linkedin: 'safwan-e-6438a398',
  upwork: 'safwands',
  fiverr: 'akRXNlW',
  interestKeys: ['embedded', 'signal', 'control', 'ai', 'nn', 'ml', 'llm', 'game', '3d'],
}

export default profile
