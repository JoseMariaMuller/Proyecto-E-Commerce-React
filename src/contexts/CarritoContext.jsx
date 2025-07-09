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
    
     // --- NUEVAS FUNCIONES PARA MODIFICAR CANTIDAD ---
    const incrementarCantidad = (idProducto) => {
        setProductosCarrito((prevCarrito) =>
            prevCarrito.map(item =>
                item.id === idProducto
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    };

    const decrementarCantidad = (idProducto) => {
        setProductosCarrito((prevCarrito) =>
            prevCarrito.map(item =>
                item.id === idProducto
                    ? { ...item, cantidad: Math.max(1, item.cantidad - 1) } // Asegura que la cantidad no sea menor a 1
                    : item
            )
            // No filtramos aquí si la cantidad llega a 0, la dejaremos en 1
            // Si quisieras que al llegar a 0 se elimine, podrías añadir .filter(item => item.cantidad > 0)
        );
    };
    // --- FIN NUEVAS FUNCIONES ---

    return (
        <CarritoContext.Provider
            value={{
                productosCarrito,
                agregarAlCarrito,
                vaciarCarrito,
                borrarProductoCarrito,
                incrementarCantidad, // <--- Exportar la nueva función
                decrementarCantidad  // <--- Exportar la nueva función
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}
