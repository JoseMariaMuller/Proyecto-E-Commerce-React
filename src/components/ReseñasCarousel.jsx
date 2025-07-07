import { Carousel } from "react-bootstrap";
import "../styles/ReseñasCarousel.css";

const reseñas = [
    {
        nombre: "María L.",
        texto: "Una librería excelente, encontré libros que no conseguía en ningún lado. ¡Gracias!",
        avatar: "https://i.pravatar.cc/80?img=62",
    },
    {
        nombre: "Juan P.",
        texto: "Muy buena atención y envíos rápidos. ¡Recomiendo totalmente!",
        avatar: "https://i.pravatar.cc/80?img=6",
    },
    {
        nombre: "Lucía M.",
        texto: "El catálogo está súper completo y la web es muy fácil de usar.",
        avatar: "https://i.pravatar.cc/80?img=5",
    },
    {
        nombre: "Dante P.",
        texto: "Me encantó la sección de novedades, siempre encuentro algo interesante para leer.",
        avatar: "https://i.pravatar.cc/80?img=61",
    },
    {
        nombre: "Cristian L.",
        texto: "Excelente servicio al cliente, me ayudaron con una consulta en minutos.",
        avatar: "https://i.pravatar.cc/80?img=60",
    },
];


function ReseñasCarousel() {
    return (
        <div className="reseñas-carousel-container mt-5 mb-5">
            <h4 className="text-center mb-4">📢 Lo que opinan nuestros lectores</h4>
            <Carousel indicators={false} controls={false} interval={5000} pause={false} fade>
                {reseñas.map((r, i) => (
                    <Carousel.Item key={i}>
                        <div className="p-4 text-center shadow-sm bg-light rounded reseña-card">
                            <img
                                src={r.avatar}
                                alt={`Avatar de ${r.nombre}`}
                                className="reseña-avatar mb-3"
                            />
                            <p className="fst-italic">"{r.texto}"</p>
                            <small className="text-muted d-block mt-2">— {r.nombre}</small>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default ReseñasCarousel;
