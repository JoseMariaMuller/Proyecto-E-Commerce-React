import { useEffect, useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import Contacto from './components/Contacto';
import Admin from './components/Admin';
import Login2 from './components/Login2';
import FormularioEdicion from './components/FormularioEdicion';
import { useAuthContext } from './contexts/AuthContext';
import ProductosContainerFirebase from './components/ProductosContainerFirebase';
import ProductoDetalleFirebase from './components/ProductoDetalleFirebase';
import FormularioProductoFirebase from './components/FormularioProductoFirebase';
import NavBoostrap from './components/NavBootstrap';
import CarritoBootstrap from './components/CarritoBootstrap';
import ScrollToTop from './utils/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const { verificacionLog } = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones en ms
      easing: 'ease-in-out', // Tipo de easing
      once: true, // Animación solo una vez al desplazarse
    });
    AOS.refresh(); // Refresca AOS en caso de cambios en el DOM
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div>
        <NavBoostrap />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/productos" element={<ProductosContainerFirebase />} />
          <Route path="/productosF/:id" element={<ProductoDetalleFirebase />} />
          <Route path="/agregarproducto" element={<FormularioProductoFirebase />} />
          <Route path="/carrito" element={<CarritoBootstrap />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/admin/agregarProductos" element={<FormularioProductoFirebase />} />
          <Route path="/admin/editarProducto/:id" element={<FormularioEdicion />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right" // Posición de las notificaciones
        autoClose={3000}    // Tiempo en ms para que la notificación se cierre sola (3 segundos)
        hideProgressBar={false} // Mostrar o no la barra de progreso
        newestOnTop={false} // Mostrar notificaciones nuevas encima de las viejas
        closeOnClick      // Cerrar la notificación al hacer clic en ella
        rtl={false}       // Soporte de idiomas de derecha a izquierda
        pauseOnFocusLoss  // Pausar el temporizador si la pestaña pierde el foco
        draggable         // Permitir arrastrar la notificación
        pauseOnHover      // Pausar el temporizador al pasar el mouse por encima
        theme="colored"   // Estilo del tema (light, dark, colored)
      />
    </Router>
  )
}

export default App