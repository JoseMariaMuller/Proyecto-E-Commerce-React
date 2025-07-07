import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalleFirebase({ }) {

  const navegar = useNavigate();

  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, eliminarProductoFirebase, obtenerProductoFirebase } = useProductosContext();

  const { id } = useParams();
  //const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  console.log(id)

  useEffect(() => {
    obtenerProductoFirebase(id).then(() => {
      console.log("test")
      setCargando(false);
    }).catch((error) => {
      if (error == "Producto no encontrado") {
        setError("Producto no encontrado")
      }
      if (error == "Hubo un error al obtener el producto.") {
        setError("Hubo un error al obtener el producto.");
      }
      setCargando(false);
    })
  }, [id]);


  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar() {
    eliminarProductoFirebase(id).then(() => {
      navegar("/productos")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
    })
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

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

          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-outline-secondary me-2" onClick={restarContador}>-</button>
            <span className="fs-5 px-3">{cantidad}</span>
            <button className="btn btn-outline-secondary" onClick={sumarContador}>+</button>
          </div>

          {!admin && (
            <button className="btn btn-success w-100 mb-3" onClick={funcionCarrito}>
              🛒 Agregar al carrito
            </button>
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
