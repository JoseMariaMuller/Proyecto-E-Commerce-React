import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card"
import { useProductosContext } from "../contexts/ProductosContext"
import { useAuthContext } from "../contexts/AuthContext"

function ProductosContainer({}){
    const {productos, obtenerProductos} = useProductosContext();
    //const [productosComponente, setProductosComponente] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);}


    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                {productos.map((producto) => (
                    <Card
                        producto={producto}
                    />
                ))}
            </div>
        )
    }

    
}

export default ProductosContainer
