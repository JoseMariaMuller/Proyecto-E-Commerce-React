// import { useEffect, useState } from "react"
// import "../styles/Productos.css"
// import Card from "./Card"
// import { useProductosContext } from "../contexts/ProductosContext"
// import { Row, Col } from "react-bootstrap";



// function ProductosContainer({ }) {
//     const { productos, obtenerProductosFirebase, filtrarProductos } = useProductosContext();
    
//     const [cargando, setCargando] = useState(true);
//     const [error, setError] = useState(null);
//     const [filtro, setFiltro] = useState("")

//     {
//         useEffect(() => {
//             obtenerProductosFirebase().then((productos) => {
//                 setCargando(false);
//             }).catch((error) => {
//                 setError('Hubo un problema al cargar los productos.');
//                 setCargando(false);
//             })
//         }, []);
//     }

//     useEffect(() => {
//         if (filtro.length > 0) {
//             filtrarProductos(filtro)
//         }
//     }, [filtro])


//     if (cargando) {
//         return <p>Cargando productos...</p>;
//     } else if (error) {
//         return <p>{error}</p>;
//     } else {
//         return (
//             <div className="container py-4">
//                 <input
//                     type="text"
//                     placeholder="Buscar productos..."
//                     className="form-control mb-4"
//                     value={filtro}
//                     onChange={(e) => setFiltro(e.target.value)}
//                 />
//                 <Row>
//                     {productos.map((producto) => (
//                         <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
//                             <Card producto={producto} />
//                         </Col>
//                     ))}
//                 </Row>
//             </div>

//         )
//     }


// }

// export default ProductosContainer

