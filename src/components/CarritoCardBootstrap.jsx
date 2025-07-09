import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // ¡Importa Link!


function CarritoCardBootstrap({ producto, funcionDisparadora, incrementarCantidad, decrementarCantidad }) {


    if (!producto || !producto.imagen) {
        return (
            <Card className="mb-3 border-danger">
                <Card.Body>
                    <p className="text-danger">Error: producto no definido o incompleto</p>
                </Card.Body>
            </Card>
        );
    }

    function borrarDelCarrito() {
        funcionDisparadora(producto.id);
    }

    return (
        <Card className="mb-3 shadow-sm bg-transparent border-0">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs={12} md={3} className="mb-3 mb-md-0">
                        <Card.Img
                            variant="top"
                            src={producto.imagen}
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </Col>

                    <Col xs={12} md={9}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Card.Title>{producto.name}</Card.Title>
                                <Card.Text className="text-muted">{producto.description}</Card.Text>
                            </Col>
                            <Col xs={12} md={6}>
                                <div style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    padding: "10px",
                                    backgroundColor: "#f9f9f9",
                                    textAlign: "left",
                                    marginBottom: "15px"
                                }}>
                                    <p className="mb-2"><strong>Cantidad:</strong></p>
                                    <div className="d-flex align-items-center mb-3">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => decrementarCantidad(producto.id)}
                                            disabled={producto.cantidad <= 1}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2 fs-5">{producto.cantidad}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => incrementarCantidad(producto.id)}
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <p className="mb-2"><strong>Precio:</strong> ${producto.price}</p>
                                    <p className="mb-0"><strong>Subtotal:</strong> ${(producto.cantidad * producto.price).toFixed(2)}</p>
                                </div>
                                <Button variant="danger" className="w-100 mb-2" onClick={borrarDelCarrito}>
                                    🗑️ Eliminar
                                </Button>

                                <Link to="/productos" className="btn btn-outline-primary w-100">
                                    ⬅️ Ver más productos
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default CarritoCardBootstrap;