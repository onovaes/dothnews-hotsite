import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './styles/components.scss'
import App from './App'

const rootElement = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (!rootElement) {
  throw new Error('Root element #root was not found.')
}

if (rootElement.children.length > 0) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
