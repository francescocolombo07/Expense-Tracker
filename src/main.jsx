import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// App.jsx si aspetta che questi componenti siano disponibili
import App from './App.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)