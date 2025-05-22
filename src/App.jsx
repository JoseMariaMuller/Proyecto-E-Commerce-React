import { useState } from 'react';
import './App.css';
import Home from './layouts/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import ProductosContainer from './components/ProductosConteiner';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [adminLogeado, setAdminLogeado] = useState(false);

  function funcionCarrito(producto) {
    const existe = productosCarrito.find((p) => p.id === producto.id);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id) {
          return { ...p, cantidad: p.cantidad + producto.cantidad };
        } else {
          return p;
        }
      });
      setProductosCarrito(carritoActualizado);
    } else {
      const nuevoCarrito = [...productosCarrito, producto];
      setProductosCarrito(nuevoCarrito);
    }
  }

  function borrarProductoCarrito(id) {
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  }

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado);
  }

  function manejarUser() {
    setUsuarioLogeado(!usuarioLogeado);
  }

  return (
    <Router>
      <div>
        <Nav productosCarrito={productosCarrito} />

        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                user={usuarioLogeado}
                admin={adminLogeado}
                setLogeadoAdmin={manejarAdmin}
                setLogeadoUser={manejarUser}
              />
            }
          />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas protegidas */}
          <Route
            path="/productos"
            element={
              (usuarioLogeado || adminLogeado) ? (
                <ProductosContainer />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/productos/:id"
            element={
              (usuarioLogeado || adminLogeado) ? (
                <ProductoDetalle funcionCarrito={funcionCarrito} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/carrito"
            element={
              usuarioLogeado ? (
                <Carrito
                  productosCarrito={productosCarrito}
                  funcionBorrar={borrarProductoCarrito}
                  usuarioLogeado={usuarioLogeado}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              adminLogeado ? (
                <Admin />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;