import { useContext, useState, useEffect, useRef } from "react"; // Importa useEffect y useRef
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function NavBoostrap() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();

  const [expanded, setExpanded] = useState(false);
  
  // 1. Crear una referencia para el elemento Navbar
  const navbarRef = useRef(null);

  // Función para cerrar el navbar (la misma que ya tienes)
  const handleNavLinkClick = () => {
    setExpanded(false); 
  };

  // 2. useEffect para manejar clics fuera del Navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el navbar está expandido Y el clic no fue dentro del Navbar
      if (expanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false); // Cierra el menú
      }
    };

    // Añadir el event listener al documento cuando el componente se monta o 'expanded' cambia
    document.addEventListener("mousedown", handleClickOutside);

    // Remover el event listener cuando el componente se desmonta (limpieza)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]); // El efecto se vuelve a ejecutar si 'expanded' cambia

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top"
      expanded={expanded} 
      onToggle={() => setExpanded(!expanded)} 
      ref={navbarRef} // 3. Asignar la referencia al Navbar
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
          Librería Aurora
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos" onClick={handleNavLinkClick}>Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros" onClick={handleNavLinkClick}>Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto" onClick={handleNavLinkClick}>Contacto</Nav.Link>
            {admin && <Nav.Link as={Link} to="/admin" onClick={handleNavLinkClick}>Admin</Nav.Link>}
            {admin && <Nav.Link as={Link} to="/admin/agregarProductos" onClick={handleNavLinkClick}>Agregar productos</Nav.Link>}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito" onClick={handleNavLinkClick}>
              <FaShoppingCart style={{ marginRight: "5px" }} />
              {productosCarrito.length > 0 && (
                <Badge bg="light" text="dark">{productosCarrito.length}</Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBoostrap;