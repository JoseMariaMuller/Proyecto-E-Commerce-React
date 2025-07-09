import React, { createContext, useState, useContext } from 'react';
import { crearProducto, editarProductoFirebase, eliminarProductoF, obtenerProductoEnFirebase, obtenerProductosF } from '../auth/firebase';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState(null); // Mejor iniciar con null para un solo producto
    const [productosOriginales, setProductosOriginales] = useState([]); // Usado para filtrado

    function obtenerProductosFirebase(){
        return new Promise((res, rej) => {
            obtenerProductosF()
                .then(productosData => {
                    setProductos(productosData);
                    setProductosOriginales(productosData);
                    res();
                })
                .catch(error => {
                    console.error("Error al obtener productos de Firebase:", error);
                    rej(error);
                });
        });
    }

    function obtenerProductoFirebase(id){
        console.log("Intentando obtener producto de Firebase con ID:", id);
        return new Promise((res, rej) => {
            obtenerProductoEnFirebase(id)
                .then(producto => {
                    setProductoEncontrado(producto);
                    console.log("Producto encontrado en Firebase:", producto);
                    res(producto);
                })
                .catch(err => {
                    console.error("Error al obtener el producto de Firebase:", err);
                    rej("Hubo un error al obtener el producto.");
                }); 
        });
    }

    function editarProductoF(producto){
        return new Promise((res, rej) => {
            editarProductoFirebase(producto)
                .then(editedProduct => {
                    setProductoEncontrado(editedProduct);
                    console.log("Producto editado en Firebase:", editedProduct);
                    res(editedProduct);
                })
                .catch(error => {
                    console.error("Error al editar producto en Firebase:", error);
                    rej(error);
                });
        });
    }

    function eliminarProductoFirebase(id){
        return new Promise((res, rej) => {
            eliminarProductoF(id)
                .then(() => {
                    console.log("Producto eliminado de Firebase con ID:", id);
                    res();
                })
                .catch(error => {
                    console.error("Error al eliminar producto de Firebase:", error);
                    rej(error);
                });
        });
    }

    function agregarProductoFirebase(producto) {
        return new Promise(async (res, rej) => {
            try {
                const docId = await crearProducto(producto); 
                console.log("Producto agregado a Firebase. ID:", docId);
                res(docId);
            } catch (error) {
                console.error("Error al agregar producto en ProductosContext:", error);
                rej(error);
            }
        });
    }

    function filtrarProductos(filtro){
        if(filtro.length === 0){
            setProductos(productosOriginales);
            return;
        }

        const productosFiltrados = productosOriginales.filter(producto =>
            producto.name.toLowerCase().includes(filtro.toLowerCase())
        );
        setProductos(productosFiltrados);
    }

    return (
        <ProductosContext.Provider value={{
            agregarProductoFirebase,
            filtrarProductos,
            eliminarProductoFirebase,
            editarProductoF,
            obtenerProductosFirebase,
            obtenerProductoFirebase,
            productos,
            productoEncontrado,
        }}>
            {children}
        </ProductosContext.Provider> 
    );
}

export const useProductosContext = () => useContext(ProductosContext);