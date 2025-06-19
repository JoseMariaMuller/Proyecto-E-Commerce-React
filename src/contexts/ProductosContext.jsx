import React, { createContext, useState, useContext } from 'react';
// Crear el contexto de de los productos
const ProductosContext = createContext();
export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState([])

    function obtenerProductos() {
        return(
            new Promise((res, rej) => {
                fetch('https://681c09aa6ae7c794cf707bcb.mockapi.io/productos')
                    .then((respuesta) =>
                        respuesta.json()
                    )
                    .then((datos) => {
                        console.log(datos)
                        setProductos(datos)
                        res(datos)
                        //setCargando(false);
                    })
                    .catch((error) => {
                        console.log("Error", error)
                        //setError('Hubo un problema al cargar los productos.');
                        //setCargando(false);
                        rej(error)
                    })
                ;
            })
        )
    }

    const agregarProducto = (producto) => {
        return(
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch('https://681c09aa6ae7c794cf707bcb.mockapi.io/productos', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });

                    if (!respuesta.ok) {
                            throw new Error('Error al agregar el producto.');
                    }
                    const data = await respuesta.json();
                            console.log('Producto agregado:', data);
                            res(data)
                            //alert('Producto agregado correctamente');
                    } catch (error) {
                        console.error(error.message);
                        //alert('Hubo un problema al agregar el producto.');
                        rej(error.message)
                    }
            })
        )
    };

    function obtenerProducto(id){
        return(
            new Promise((res, rej) => {
               fetch("https://681c09aa6ae7c794cf707bcb.mockapi.io/productos")
                .then((res) => res.json())
                .then((datos) => {
                    const productoEncontrado = datos.find((item) => item.id === id);
                    if (productoEncontrado) {
                    setProductoEncontrado(productoEncontrado);
                    res(datos)
                    } else {
                        rej("Producto no encontrado")
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                    rej("Hubo un error al obtener el producto.");
                }); 
            })
        )
    }

    function editarProducto(producto){
        return(
            new Promise(async(res, rej) => {
            try {
                const respuesta = await fetch(`https://681c09aa6ae7c794cf707bcb.mockapi.io/productos/${producto.id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el producto.');
                }
                const data = await respuesta.json();
                res(data)
            } catch (error) {
                console.error(error.message);
                rej(error)
            }
            })
        )
    }

    const eliminarProducto = (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar?');
        if (confirmar) {
            return(
                new Promise(async (res, rej) => {
                    try {
                        const respuesta = await fetch(`https://681c09aa6ae7c794cf707bcb.mockapi.io/productos/${id}`, {
                        method: 'DELETE',
                        });
                        if (!respuesta.ok) throw new Error('Error al eliminar');
                        alert('Producto eliminado correctamente.');
                        res()
                    } catch (error) {
                        console.error(error.message);
                        alert('Hubo un problema al eliminar el producto.');
                        rej(error)
                    }
                })
            )
        }
    }

    return (
        <ProductosContext.Provider value={{ obtenerProductos, productos, agregarProducto, obtenerProducto, productoEncontrado, editarProducto, eliminarProducto }}>
        {children}
        </ProductosContext.Provider> 
    );
}
export const useProductosContext = () => useContext(ProductosContext);