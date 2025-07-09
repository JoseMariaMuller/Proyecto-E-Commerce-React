import { Link } from "react-router-dom";
import '../styles/Main.css';
import ReseñasCarousel from "./ReseñasCarousel";
import CarruselBootstrap from "./CarruselBootstrap";

function Main() {
    return (
        <main className="main-container">
            {/* Animación para el título principal */}
            <h2 className="main-title" data-aos="fade-up">Bienvenido a Librería Aurora</h2>
            
            {/* Animación para la descripción */}
            <p className="main-description" data-aos="fade-up" data-aos-delay="200">
                Desde clásicos atemporales hasta los lanzamientos más esperados, nuestra colección tiene algo para cada lector. Explorá, descubrí y disfrutá el placer de leer.
            </p>

            {/* Animación para la imagen principal */}
            <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Estantería de libros"
                className="main-image"
                data-aos="zoom-in" 
                data-aos-delay="400"
            />

            {/* Animación para la sección de beneficios (el contenedor completo) */}
            <section className="main-benefits">
                {/* Animación individual para cada tarjeta de beneficio */}
                <div className="benefit-card" data-aos="fade-right">
                    <h3>📚 Variedad de géneros</h3>
                    <p>Romance, ciencia ficción, historia, fantasía y mucho más para todos los gustos.</p>
                </div>

                <div className="benefit-card" data-aos="fade-up" data-aos-delay="200"> 
                    <h3>🚚 Envíos rápidos</h3>
                    <p>Hacemos envíos a todo el país en menos de 72 horas. ¡Tu libro donde lo necesites!</p>
                </div>

                <div className="benefit-card" data-aos="fade-left" data-aos-delay="400"> 
                    <h3>⭐ Reseñas reales</h3>
                    <p>Leé opiniones de otros lectores antes de elegir tu próxima lectura.</p>
                </div>
            </section>

            {/* Animación para el botón */}
            <Link to="/productos">
                <button className="main-button" data-aos="flip-up" data-aos-offset="50">
                    Ver catálogo de libros
                </button>
            </Link>
            
            {/* Si ReseñasCarousel y CarruselBootstrap tienen contenido que aparece al hacer scroll,
                también podrías añadirles animaciones a sus contenedores o elementos internos. */}
            <ReseñasCarousel />
            <CarruselBootstrap />
        </main>
    );
}

export default Main;