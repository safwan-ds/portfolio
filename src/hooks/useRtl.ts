import { useTranslation } from 'react-i18next'

export function useRtl() {
  const { i18n } = useTranslation()
  return i18n.language === 'ar'
}
