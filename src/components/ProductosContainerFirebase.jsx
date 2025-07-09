import { useEffect, useState } from "react";

import { useProductosContext } from "../contexts/ProductosContext";
import CardProducto from "./Card";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Col, Row, Spinner } from "react-bootstrap";

function ProductosContainerFirebase() {
    const { productos, obtenerProductosFirebase, filtrarProductos } = useProductosContext();
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        obtenerProductosFirebase()
            .then(() => setCargando(false))
            .catch((error) => {
                console.log("Error", error);
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);

    useEffect(() => {
        filtrarProductos(filtro);
    }, [filtro]);

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center">
                {error}
            </Alert>
        );
    }

    return (
        <div className="container py-4">
            <Helmet>
                <title>Productos | Librería Aurora</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>

            <div className="input-group mb-4 mt-3">
                <span className="input-group-text">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar productos..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {productosActuales.length > 0 ? (
                    productosActuales.map((producto) => (
                        <Col key={producto.id}>
                            <CardProducto producto={producto} />
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No se encontraron productos.</p>
                )}
            </Row>

            <div className="d-flex justify-content-center my-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
                            }`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductosContainerFirebase;
