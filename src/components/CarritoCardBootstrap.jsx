import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
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
                            <Col md={4}>
                                <div style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    padding: "10px",
                                    backgroundColor: "#f9f9f9",
                                    textAlign: "left",
                                }}>
                                    <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                    <p><strong>Precio:</strong> {producto.price} $</p>
                                    <p><strong>Subtotal:</strong> {(producto.cantidad * producto.price).toFixed(2)} $</p>
                                </div>
                            <Button variant="danger" className="mt-4" onClick={borrarDelCarrito}>
                                Eliminar
                            </Button>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default CarritoCardBootstrap;
