/**
 * Contact form — reads profile + socials from src/data/.
 * Edit profile.ts for email, socials.ts for social links.
 */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { HiPaperAirplane, HiOutlineEnvelope } from 'react-icons/hi2'
import SectionReveal from './SectionReveal'
import SectionWrapper from './SectionWrapper'
import GlassCard from './GlassCard'
import FormInput from './FormInput'
import NeonButton from './NeonButton'
import { profile, socials } from '../../data'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contact" label={t('contact.label')} title={t('contact.title')}>
      <div className="grid md:grid-cols-2 gap-12">
        <SectionReveal delay={0.1}>
            {status === 'sent' ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="rounded-2xl bg-carbon/50 backdrop-blur-sm border border-neon-cyan/30 p-8 text-center">
                <HiPaperAirplane className="w-10 h-10 text-neon-cyan mx-auto mb-4" />
                <p className="font-display text-lg text-text-primary mb-2">{t('contact.sent_title')}</p>
                <p className="text-text-secondary text-sm mb-4">{t('contact.sent_desc')}</p>
                <button onClick={() => setStatus('idle')} className="font-mono text-xs text-neon-cyan hover:underline">{t('contact.send_another')}</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  id="name"
                  label={t('contact.name')}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}
                  placeholder={t('contact.name_placeholder')}
                />
                <FormInput
                  id="email"
                  label={t('contact.email')}
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: (e.target as HTMLInputElement).value })}
                  placeholder={t('contact.email_placeholder')}
                />
                <FormInput
                  id="message"
                  label={t('contact.message')}
                  as="textarea"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: (e.target as HTMLTextAreaElement).value })}
                  placeholder={t('contact.message_placeholder')}
                />
                {status === 'error' && <p className="font-mono text-xs text-neon-pink">{t('contact.error')}</p>}
                <NeonButton type="submit" disabled={status === 'sending'} solid>
                  {status === 'sending' ? (<><span className="w-4 h-4 border-2 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin" />{t('contact.sending')}</>) : (<><HiPaperAirplane className="w-4 h-4" />{t('contact.send')}</>)}
                </NeonButton>
              </form>
            )}
          </SectionReveal>

          <SectionReveal delay={0.25} direction="right">
            <div className="space-y-5">
              <GlassCard>
                <div className="flex items-center gap-3 mb-4">
                  <HiOutlineEnvelope className="w-5 h-5 text-neon-blue" />
                  <p className="font-display text-base font-semibold text-text-primary">{t('contact.email_direct')}</p>
                </div>
                <a href={`mailto:${profile.email}`} className="font-mono text-sm text-neon-blue hover:text-neon-cyan transition-colors">{profile.email}</a>
              </GlassCard>
              <GlassCard>
                <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-4">{t('contact.find_me')}</p>
                <div className="flex gap-4">
                  {socials.map((social) => {
                    const Icon = social.icon
                    return (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                        className={`p-3 rounded-lg bg-slate/20 text-text-secondary ${social.hoverColor} transition-all hover:bg-slate/30`}>
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </GlassCard>
            </div>
          </SectionReveal>
        </div>
    </SectionWrapper>
  )
}
