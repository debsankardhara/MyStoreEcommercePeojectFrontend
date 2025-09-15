import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './Context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AppProvider>
      <App />
      <Toaster />
    </AppProvider>
  </BrowserRouter>



)
