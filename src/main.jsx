import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import ClockApp from './ClockApp.jsx'

createRoot(document.getElementById('root')).render(
  <ClockApp />
)
