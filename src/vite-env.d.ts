/// <reference types="vite/client" />

/* Preloader ready signal — set by App.tsx, called from index.html inline script */
interface Window {
  _preloaderReady?: () => void
}
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_AI_CHAT_WORKER_URL?: string
  readonly VITE_FORMSPREE_ID?: string
}
