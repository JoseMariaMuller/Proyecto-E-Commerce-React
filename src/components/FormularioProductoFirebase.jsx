import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useProductosContext } from '../contexts/ProductosContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { dispararSweetBasico } from '../assets/SweetAlert';

function FormularioProductoFirebase() {
  const { agregarProductoFirebase } = useProductosContext();
  const { admin } = useAuthContext();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();

    if (validarForm === true) {
      try {
        await agregarProductoFirebase(producto);
        setProducto({ name: '', price: '', description: '', imagen: '' });

        
        await dispararSweetBasico(
          "Producto agregado con éxito",
          "El nuevo libro fue guardado correctamente.",
          "success",
          "Ir al panel"
        );

        navigate('/admin');
      } catch (error) {
        dispararSweetBasico(
          "Hubo un problema al agregar el producto",
          error.message || error,
          "error",
          "Cerrar"
        );
      }
    } else {
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar");
    }
  };

  if (!admin) return <Navigate to="/login" replace />;

  return (
    <form onSubmit={handleSubmit2} className="container mt-5 p-4 mb-5 shadow rounded bg-light" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Agregar Producto</h2>
      {/* Inputs */}
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre:</label>
        <input type="text" className="form-control" id="nombre" name="name" value={producto.name} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">URL de la Imagen:</label>
        <input type="text" className="form-control" id="imagen" name="imagen" value={producto.imagen} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio:</label>
        <input type="number" className="form-control" id="precio" name="price" value={producto.price} onChange={handleChange} min="0" required />
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción:</label>
        <textarea className="form-control" id="descripcion" name="description" rows="3" value={producto.description} onChange={handleChange} required />
      </div>

      <button type="submit" className="btn btn-primary w-100">Agregar Producto</button>
    </form>
  );
}

export default FormularioProductoFirebase;
