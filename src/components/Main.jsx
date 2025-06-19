import '../styles/Main.css';
import { Link } from "react-router-dom";
function Main() {
    return (

        <main className="main-container">
            <h2 className="main-title">Bienvenido a Librería Aurora</h2>
            <p className="main-description">
                Desde clásicos atemporales hasta los lanzamientos más esperados, nuestra colección tiene algo para cada lector. Explorá, descubrí y disfrutá el placer de leer.
            </p>

            <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Estantería de libros"
                className="main-image"
            />

            <section className="main-benefits">
                <div className="benefit-card">
                    <h3>📚 Variedad de géneros</h3>
                    <p>Romance, ciencia ficción, historia, fantasía y mucho más para todos los gustos.</p>
                </div>

                <div className="benefit-card">
                    <h3>🚚 Envíos rápidos</h3>
                    <p>Hacemos envíos a todo el país en menos de 72 horas. ¡Tu libro donde lo necesites!</p>
                </div>

                <div className="benefit-card">
                    <h3>⭐ Reseñas reales</h3>
                    <p>Leé opiniones de otros lectores antes de elegir tu próxima lectura.</p>
                </div>
            </section>

            <Link to="/productos">
                <button className="main-button">Ver catálogo de libros</button>
            </Link>
        </main>

    );
}

export default Main;