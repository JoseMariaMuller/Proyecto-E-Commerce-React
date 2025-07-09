import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container, Spinner } from "react-bootstrap";

function CarruselBootstrap() {
    const { productos, obtenerProductosFirebase } = useProductosContext();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (productos.length === 0) {
            obtenerProductosFirebase().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    const primerosTres = productos.slice(0, 3);
if (cargando) {
    return (
        <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Cargando carrusel...</p>
        </div>
    );
}

if (primerosTres.length === 0) {
    return <p className="text-center">No hay productos para mostrar.</p>;
}

    return (
        <Container className="my-5 d-flex justify-content-center">
            <div style={{ maxWidth: "700px", width: "100%" }}>
                <h3 className="text-center mb-4">📖 Libros destacados</h3>
                <Carousel>
                    {primerosTres.map((producto) => (
                        <Carousel.Item key={producto.id}>
                            <img
                                className="d-block w-100"
                                src={producto.imagen}
                                alt={producto.name}
                                style={{
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                            />
                            <Carousel.Caption>
                                <h5>{producto.name}</h5>
                                <p>{producto.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </Container>
    );
}

export default CarruselBootstrap;
