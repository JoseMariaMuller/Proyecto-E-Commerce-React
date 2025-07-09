// src/components/CarritoBootstrap.jsx

import { useContext } from "react";
import { Navigate, Link } from "react-router-dom"; // Importa Link
import { Button, Container } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext"; 
import { AuthContext } from "../contexts/AuthContext.jsx"; 
import CarritoCardBootstrap from "./CarritoCardBootstrap"; 

function CarritoBootstrap() {
    const { user, admin } = useContext(AuthContext); 
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito, incrementarCantidad, decrementarCantidad } = useContext(CarritoContext);

    // Lógica de protección (sin cambios)
    if (!user) {
        console.log("Carrito: Usuario no logueado, redirigiendo a /login");
        return <Navigate to="/login" replace />;
    }

    if (admin) {
        console.log("Carrito: Usuario es ADMINISTRADOR, redirigiendo a /admin.");
        return <Navigate to="/admin" replace />; 
    }

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    function funcionDisparadora2() {
        vaciarCarrito();
    }

    return (
        <Container className="my-4">
            <h2 className="mb-3">Carrito de compras</h2>
            {productosCarrito.length > 0 && (
                <Button variant="warning" className="mb-4" onClick={funcionDisparadora2}>
                    Vaciar carrito
                </Button>
            )}

            {productosCarrito.length > 0 ? (
                // Si hay productos en el carrito, los mapea y muestra
                productosCarrito.map((producto) => (
                    <CarritoCardBootstrap
                        key={producto.id}
                        producto={producto}
                        funcionDisparadora={funcionDisparadora} 
                        incrementarCantidad={incrementarCantidad} 
                        decrementarCantidad={decrementarCantidad} 
                    />
                ))
            ) : (
                // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
                // Si el carrito está vacío, muestra el mensaje y el botón
                <div className="text-center my-5"> {/* Agregamos un div para centrar */}
                    <p className="mb-3">Tu carrito está vacío. ¡Añade algunos productos!</p>
                    <Link to="/productos" className="btn btn-primary">
                        🛒 Ir a Productos
                    </Link>
                </div>
            )}

            {total > 0 && (
                <div className="mt-4 d-flex justify-content-center">
                    <div className="alert alert-success text-end fw-bold fs-5 w-auto mb-0 shadow-sm">
                        Total a pagar: ${total.toFixed(2)}
                    </div>
                </div>
            )}
        </Container>
    );
}

export default CarritoBootstrap;