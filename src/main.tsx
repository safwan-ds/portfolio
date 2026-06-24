import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/config' // must load before App
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
