/**
 * languages.ts — Language proficiency data shown in Languages section.
 */

export interface Language {
    /** i18n key under languages.items.<key> */
    key: string
    /** i18n key for proficiency level under languages.levels.<key> */
    levelKey: string
}

const languages: readonly Language[] = [
    {key: 'arabic', levelKey: 'native'},
    {key: 'english', levelKey: 'c1'},
    {key: 'turkish', levelKey: 'c2'},
]

export default languages
