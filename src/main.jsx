import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';



createRoot(document.getElementById('root')).render(
  <CookiesProvider>
  <BrowserRouter>
 
  
  <StrictMode>
    <App />
  </StrictMode>
  
  </BrowserRouter>
  </CookiesProvider>
)
