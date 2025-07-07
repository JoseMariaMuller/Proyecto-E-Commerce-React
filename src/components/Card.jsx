import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CardProducto({ producto }) {
    return (
        <Card className="h-100 d-flex flex-column" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
                style={{
                    position: "relative",
                    height: "300px",
                    overflow: "hidden",
                }}
            >
                
                <img
                    src="/imagenes/fondo-libros.png"
                    alt="fondo libros"
                    style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: " brightness(0.6)",
                        zIndex: 1,
                    }}
                />

                <Card.Img
                    src={producto.imagen}
                    alt={producto.name}
                    style={{
                        position: "relative",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        zIndex: 2,
                        margin: "0 auto",
                        display: "block",
                    }}
                />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{producto.name}</Card.Title>
                <Link to={`/productosF/${producto.id}`}>
                    <Button variant="primary" className="mt-2 w-100">Ver detalles</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default CardProducto;
