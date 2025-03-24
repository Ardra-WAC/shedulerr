import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";


import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < GoogleOAuthProvider clientId='388563583944-3t8452jhc1ljgll3chpfnjh1c5breho1.apps.googleusercontent.com'>

    <App />

    </GoogleOAuthProvider>
  </StrictMode>,
)
