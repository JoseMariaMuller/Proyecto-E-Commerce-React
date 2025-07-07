import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider({ children }) {
    
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const [productosCarrito, setProductosCarrito] = useState(carritoGuardado);

    
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    }, [productosCarrito]);

    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id){
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad };
                    return productoActualizado;
                } else {
                    return p;
                }
            });
            setProductosCarrito(carritoActualizado);
        } else {
            
            const nuevoCarrito = [...productosCarrito, producto];
            setProductosCarrito(nuevoCarrito);
        }
    };

    const vaciarCarrito = () => {
        setProductosCarrito([]);
        localStorage.removeItem("carrito"); // 
    };

    function borrarProductoCarrito(id){
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
        setProductosCarrito(nuevoCarrito);
    }

    return (
        <CarritoContext.Provider
            value={{
                productosCarrito,
                agregarAlCarrito,
                vaciarCarrito,
                borrarProductoCarrito
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}
