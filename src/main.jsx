import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CarritoProvider } from './contexts/CarritoContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProductosProvider } from './contexts/ProductosContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
    <AuthProvider>
    <CarritoProvider>
      <App />
    </CarritoProvider>
    </AuthProvider>
    </ProductosProvider>
  </StrictMode>,
)
