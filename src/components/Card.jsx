
import "../styles/Productos.css"

import { Link, Navigate } from "react-router-dom";

function Card({producto}){

    return(
        <div className="producto-card" >
            <h2 style={{color:"black"}}>{producto.name}</h2>
            <img className="producto-image" src={producto.imagen}></img>
            <p style={{color:"black"}}>{producto.price} $</p>
            <Link to={"/productos/" + producto.id} ><button style={{color:"black"}}>Ver detalles del producto</button></Link>
        </div>
    )
}

export default Card