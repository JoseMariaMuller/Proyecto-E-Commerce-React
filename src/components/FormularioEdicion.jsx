import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";

function FormularioEdicion({ }) {
    const { admin } = useAuthContext();
    const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
    const { id } = useParams();
    const [producto, setProducto] = useState(productoEncontrado);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    if (!admin) {
        return (
            <Navigate to="/login" replace />
        )
    }

    useEffect(() => {
        obtenerProducto(id).then(() => {
            //setProducto(productoEncontrado)
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const validarFormulario = () => {
        if (!producto.name.trim()) {
            return ("El nombre es obligatorio.")
        }
        if (!producto.price || producto.price <= 0) {
            return ("El precio debe ser mayor a 0.")
        }
        console.log(producto.description.trim())
        if (!producto.description.trim() || producto.description.length < 10) {
            return ("La descripción debe tener al menos 10 caracteres.")
        }
        if (!producto.imagen.trim()) {
            return ("La url de la imgaen no debe estar vacía")
        }
        else {
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validarForm = validarFormulario()
        if (validarForm == true) {
            editarProducto(producto).then((prod) => {
                alert('Producto actualizado correctamente.');
            }).catch((error) => {
                alert('Hubo un problema al actualizar el producto. ' + error.message);
            })
        } else {
            dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Producto</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={producto.name || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>URL de la Imagen</label>
                <input
                    type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="price"
                    value={producto.price || ''}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="description"
                    value={producto.description || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Actualizar Producto</button>
        </form>
    );
}

export default FormularioEdicion