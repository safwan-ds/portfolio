/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_AI_CHAT_WORKER_URL?: string
  readonly VITE_FORMSPREE_ID?: string
}
