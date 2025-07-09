import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { dispararSweetBasico } from '../assets/SweetAlert';


function FormularioEdicion() {
  const {admin} = useAuthContext();
  const {obtenerProductoFirebase, productoEncontrado, editarProductoF} = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado || { name: '', imagen: '', price: '', description: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (productoEncontrado && productoEncontrado.id === id) {
      setProducto(productoEncontrado);
    } else {
      obtenerProductoFirebase(id)
        .then(data => {
          if (data) {
            setProducto(data);
          } else {
            setError("Producto no encontrado.");
          }
        })
        .catch((err) => {
          console.error("Error al obtener el producto en edición:", err);
          setError("Hubo un error al obtener el producto para editar.");
        });
    }
  }, [id, productoEncontrado, obtenerProductoFirebase]);


  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name || !producto.name.trim()) {
      return("El nombre es obligatorio.")
    }
    if (!producto.price || isNaN(producto.price) || parseFloat(producto.price) <= 0) {
      return("El precio debe ser un número mayor a 0.")
    }
    if (!producto.description || !producto.description.trim() || producto.description.length < 10) {
      return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!producto.imagen || !producto.imagen.trim()){
      return("La url de la imagen no debe estar vacía")
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();

    if (validarForm === true) {
      const productoAActualizar = { ...producto, id: id };
      editarProductoF(productoAActualizar)
        .then(() => {
          dispararSweetBasico(
            "Producto actualizado",
            "Los cambios fueron guardados correctamente.",
            "success",
            "Aceptar"
          );
          navigate("/productos");
        })
        .catch((error) => {
          dispararSweetBasico(
            "Error",
            "Hubo un problema al actualizar el producto. " + (error.message || error),
            "error",
            "Cerrar"
          );
        });
    } else {
      dispararSweetBasico(
        "Error en la carga de producto",
        validarForm,
        "error",
        "Cerrar"
      );
    }
  };

  const handleCancel = () => {
    navigate("/productos");
  };

  return (
    <Container className="my-5">
      {error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <div className="w-100 mx-auto" style={{ maxWidth: "700px" }}> 
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <h2 className="text-center mb-4">Editar Producto</h2>

            <Form.Group className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={producto.name || ''}
                onChange={handleChange}
                placeholder="Nombre del producto"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen:</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={producto.imagen || ''}
                onChange={handleChange}
                placeholder="https://..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                min="0"
                value={producto.price || ''}
                onChange={handleChange}
                placeholder="Precio en ARS"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                value={producto.description || ''}
                onChange={handleChange}
                placeholder="Descripción del producto"
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" className="w-100">
                Actualizar Producto
              </Button>
              <Button variant="secondary" onClick={handleCancel} className="w-100">
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Container>
  );
}

export default FormularioEdicion;