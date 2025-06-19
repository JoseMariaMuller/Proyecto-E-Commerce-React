import { useEffect, useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import ProductosContainer from './components/ProductosConteiner';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login2 from './components/Login2';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdicion from './components/FormularioEdicion';
import { useAuthContext } from './contexts/AuthContext';

function App() {
  const {verificacionLog} = useAuthContext();

  useEffect(() => {
    verificacionLog()
  }, [])
  
  return (
    <Router>
      <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}/>
          {/*<Route path='/login' element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/>*/}
          <Route path="/login" element={<Login2/>} />
          <Route path="/productos" element={<ProductosContainer/>}/>
          <Route path="/carrito" element={<Carrito /> }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/productos/:id" element={<ProductoDetalle/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/admin/agregarProductos" element={<FormularioProducto/>}/>
          <Route path="/admin/editarProducto/:id" element={<FormularioEdicion/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;