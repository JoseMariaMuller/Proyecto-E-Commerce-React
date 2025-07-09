import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { Spinner } from "react-bootstrap";

function ProductoDetalleFirebase() {
  const navegar = useNavigate();

  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, eliminarProductoFirebase, obtenerProductoFirebase } = useProductosContext();

  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productoEncontrado && productoEncontrado.id === id) {
      setCargando(false);
    } else {
      obtenerProductoFirebase(id)
        .then(() => {
          setCargando(false);
        })
        .catch((err) => {
          console.error("Error al obtener el producto:", err);
          if (err.message === "Producto no encontrado") {
            setError("Producto no encontrado");
          } else {
            setError("Hubo un error al obtener el producto.");
          }
          setCargando(false);
        });
    }
  }, [id, obtenerProductoFirebase, productoEncontrado]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  const dispararEliminar = async () => {
    const result = await dispararSweetBasico(
      "¿Estás seguro?",
      "¡No podrás revertir esta acción! ¿Deseas continuar?",
      "warning",
      "Sí, eliminar!",
      true,
      "Cancelar"
    );

    if (result.isConfirmed) {
      try {
        await eliminarProductoFirebase(id);

        await dispararSweetBasico(
          "¡Eliminado!",
          "El producto ha sido eliminado exitosamente.",
          "success",
          "Aceptar"
        );
        navegar("/productos");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        dispararSweetBasico(
          "Error al eliminar",
          `Hubo un problema: ${error.message || "Error desconocido"}`,
          "error",
          "Cerrar"
        );
      }
    } else if (result.isDismissed) {
      console.log("Eliminación cancelada por el usuario.");
    }
  };

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando detalles ...</p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return <p>Producto no disponible.</p>;

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={productoEncontrado.imagen}
            alt={productoEncontrado.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{productoEncontrado.name}</h2>
          <p className="text-muted">{productoEncontrado.description}</p>
          <h4 className="text-primary mb-4">${productoEncontrado.price}</h4>

          {!admin && (
            <>
              <div className="d-flex align-items-center mb-3">
                <button className="btn btn-outline-secondary me-2" onClick={restarContador}>-</button>
                <span className="fs-5 px-3">{cantidad}</span>
                <button className="btn btn-outline-secondary" onClick={sumarContador}>+</button>
              </div>

              <button className="btn btn-success w-100 mb-3" onClick={funcionCarrito}>
                🛒 Agregar al carrito
              </button>
            </>
          )}

          {admin && (
            <>
              <div className="d-flex gap-2 mb-2">
                <Link to={`/admin/editarProducto/${id}`} className="btn btn-warning w-50">✏️ Editar</Link>
                <button className="btn btn-danger w-50" onClick={dispararEliminar}>🗑️ Eliminar</button>
              </div>
            </>
          )}

          <Link to="/productos" className="btn btn-outline-primary w-100">⬅️ Volver al catálogo</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalleFirebase;