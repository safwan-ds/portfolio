/**
 * navigation.ts — Navbar link configuration.
 * Each entry maps to a section id and an i18n key.
 */

import type {IconType} from 'react-icons'
import {HiHome} from 'react-icons/hi'

export interface NavItem {
    /** Section id (matches the id attribute on <section>) */
    id: string
    /** i18n key in nav.* namespace */
    labelKey: string
    /** Optional icon — rendered instead of text when set */
    icon?: IconType
}

const navigation: readonly NavItem[] = [
    {id: 'home', labelKey: 'nav.home', icon: HiHome},
    {id: 'about', labelKey: 'nav.about'},
    {id: 'skills', labelKey: 'nav.skills'},
    {id: 'languages', labelKey: 'nav.languages'},
    {id: 'projects', labelKey: 'nav.projects'},
    {id: 'contact', labelKey: 'nav.contact'},
]

export default navigation
