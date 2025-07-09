import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useProductosContext } from '../contexts/ProductosContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Container, Form, Button } from "react-bootstrap";


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log("handleSubmit2 INICIADO. Estado actual del producto:", producto);

    if (!producto.name.trim()) {
      dispararSweetBasico("Campo Obligatorio", "El nombre del producto es obligatorio.", "error", "Entendido");
      return;
    }
    if (producto.price <= 0 || isNaN(producto.price)) {
      dispararSweetBasico("Valor Inválido", "El precio debe ser un número mayor a 0.", "error", "Entendido");
      return;
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      dispararSweetBasico("Descripción Corta", "La descripción debe tener al menos 10 caracteres.", "error", "Entendido");
      return;
    }
    if (!producto.imagen.trim()) {
      dispararSweetBasico("Campo Obligatorio", "La URL de la imagen es obligatoria.", "error", "Entendido");
      return;
    }

    try {
      await agregarProductoFirebase(producto);
      const result = await dispararSweetBasico("✅ Éxito", "Producto agregado con éxito", "success", "Ver Productos");

      if (result.isConfirmed) {
        setProducto({ name: '', price: '', description: '', imagen: '' });
        navigate('/productos');
      } else {
        setProducto({ name: '', price: '', description: '', imagen: '' });
      }

    } catch (error) {
      dispararSweetBasico("⚠️ Error", "Hubo un problema al guardar el producto. Inténtelo de nuevo.", "error", "Cerrar");
    }
  };

  if (!admin) {

    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-5">
      <div className="w-100 mx-auto" style={{ maxWidth: "700px" }}>
        <Form onSubmit={handleSubmit2} className="shadow p-4 rounded bg-light">
          <h2 className="mb-4 text-center">Agregar Producto</h2>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
            <Form.Control type="text" id="nombre" name="name" value={producto.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="imagen">URL de la Imagen:</Form.Label>
            <Form.Control type="text" id="imagen" name="imagen" value={producto.imagen} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="precio">Precio:</Form.Label>
            <Form.Control type="number" id="precio" name="price" value={producto.price} onChange={handleChange} min="0" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="descripcion">Descripción:</Form.Label>
            <Form.Control as="textarea" id="descripcion" name="description" rows="3" value={producto.description} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">Agregar Producto</Button>
          <Button variant="secondary" className="w-100 mt-3" onClick={() => navigate('/productos')}>Cancelar</Button>
        </Form>
      </div>
    </Container>
  );
}

export default FormularioProductoFirebase;