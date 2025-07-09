import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function NavBoostrap() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);


  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      ref={navbarRef}
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