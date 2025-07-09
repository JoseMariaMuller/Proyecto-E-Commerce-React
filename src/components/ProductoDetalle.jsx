// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { dispararSweetBasico } from "../assets/SweetAlert";
// import { CarritoContext } from "../contexts/CarritoContext";
// import { useAuthContext } from "../contexts/AuthContext";
// import { useProductosContext } from "../contexts/ProductosContext";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";

// function ProductoDetalle() {
//   const navegar = useNavigate();
//   const { admin } = useAuthContext();
//   const { agregarAlCarrito } = useContext(CarritoContext);
//   const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

//   const { id } = useParams();
//   const [cantidad, setCantidad] = useState(1);
//   const [cargando, setCargando] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     obtenerProducto(id)
//       .then(() => setCargando(false))
//       .catch((error) => {
//         setError(error === "Producto no encontrado" ? error : "Hubo un error al obtener el producto.");
//         setCargando(false);
//       });
//   }, [id]);

//   function funcionCarrito() {
//     if (cantidad < 1) return;
//     dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
//     agregarAlCarrito({ ...productoEncontrado, cantidad });
//   }

//   function dispararEliminar() {
//     eliminarProducto(id)
//       .then(() => navegar("/productos"))
//       .catch((error) => {
//         dispararSweetBasico("Error al eliminar", error, "error", "Cerrar");
//       });
//   }

//   function sumarContador() {
//     setCantidad(cantidad + 1);
//   }

//   function restarContador() {
//     if (cantidad > 1) setCantidad(cantidad - 1);
//   }

//   if (cargando) return <p className="text-center mt-5">Cargando producto...</p>;
//   if (error) return <p className="text-danger text-center mt-5">{error}</p>;
//   if (!productoEncontrado) return null;

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={8}>
//           <Card className="shadow-lg">
//             <Row>
//               <Col md={6}>
//                 <Card.Img
//                   src={productoEncontrado.imagen}
//                   alt={productoEncontrado.name}
//                   style={{ objectFit: "cover", height: "100%", borderRadius: "0.375rem 0 0 0.375rem" }}
//                 />
//               </Col>
//               <Col md={6}>
//                 <Card.Body>
//   <Card.Title className="fs-3">{productoEncontrado.name}</Card.Title>
//   <Card.Text>{productoEncontrado.description}</Card.Text>
//   <Card.Text className="fw-bold fs-4 text-success">${productoEncontrado.price}</Card.Text>

  
//   <div className="d-flex align-items-center justify-content-center mb-4">
//     <Button variant="outline-dark" onClick={restarContador} className="px-3 py-2 fs-5">
//       −
//     </Button>
//     <span className="mx-3 fs-5 px-3 py-2 border rounded-pill bg-light">
//       {cantidad}
//     </span>
//     <Button variant="outline-dark" onClick={sumarContador} className="px-3 py-2 fs-5">
//       +
//     </Button>
//   </div>

  
//   {admin ? (
//     <div className="d-flex justify-content-between mt-3">
//       <Link to={`/admin/editarProducto/${id}`} className="btn btn-warning w-50 me-2">
//         ✏️ Editar
//       </Link>
//       <Button variant="danger" className="w-50" onClick={dispararEliminar}>
//         🗑️ Eliminar
//       </Button>
//     </div>
//   ) : (
//     <Button
//       variant="success"
//       className="w-100 fs-5 d-flex align-items-center justify-content-center gap-2"
//       onClick={funcionCarrito}
//     >
//       🛒 Agregar al carrito
//     </Button>
//   )}
// </Card.Body>

//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ProductoDetalle;
