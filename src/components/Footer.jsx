import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-section">
                    <h4>Navegación</h4>
                    <Link to="/" className="footer-link">Inicio</Link>
                    <Link to="/productos" className="footer-link">Productos</Link>
                    <Link to="/nosotros" className="footer-link">Nosotros</Link>
                    <Link to="/contacto" className="footer-link">Contacto</Link>
                    <Link to="/login" className="footer-link">Login</Link>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p className="footer-info">📍 Av. Libertador 1234, Buenos Aires, Argentina</p>
                    <p className="footer-info">📞 +54 11 5555-5555</p>
                    <p className="footer-info">🕐 Lunes a Viernes 9 a 18 hs · Sábados 10 a 14 hs</p>
                </div>

                <div className="footer-section">
                    <h4>Redes Sociales</h4>
                    <div className="footer-social">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>
            </div>

            <p className="footer-bottom">
                © {new Date().getFullYear()} Librería Aurora. Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default Footer;
