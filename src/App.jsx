import { useEffect, useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login2 from './components/Login2';
import FormularioEdicion from './components/FormularioEdicion';
import { useAuthContext } from './contexts/AuthContext';
import ProductosContainerFirebase from './components/ProductosContainerFirebase';
import ProductoDetalleFirebase from './components/ProductoDetalleFirebase';
import FormularioProductoFirebase from './components/FormularioProductoFirebase';
import NavBoostrap from './components/NavBootstrap';
import CarritoBootstrap from './components/CarritoBootstrap';

function App() {
  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])
  
  return (
    <Router>
      <div>
        <NavBoostrap/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login2/>} />
          <Route path="/productos" element={<ProductosContainerFirebase/>}/>
          <Route path="/productosF/:id" element={<ProductoDetalleFirebase/>} />
          <Route path="/agregarproducto" element={<FormularioProductoFirebase/>} />
          <Route path="/carrito" element={<CarritoBootstrap /> }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/productos/:id" element={<ProductoDetalle/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/admin/agregarProductos" element={<FormularioProductoFirebase/>}/>
          <Route path="/admin/editarProducto/:id" element={<FormularioEdicion/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App