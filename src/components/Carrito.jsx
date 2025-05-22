import "../styles/Carrito.css"

import CarritoCard from "./CarritoCard.jsx";

export default function Carrito({productosCarrito, funcionBorrar}) {
    console.log("Productos: " + productosCarrito)

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    )

    function funcionDisparadora(id){
        funcionBorrar(id)
    }

    console.log("Total: " + total)

    return(
        <div className="carrito-conteiner">
            
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <CarritoCard 
                    producto={producto}
                    funcionDisparadora={funcionDisparadora}
                />
            ))
            : <p>Carrito vacio</p>}
            {total > 0 ? <span>Total a pagar: {total.toFixed(2)} $</span>: <></>}
        </div>
    )
}