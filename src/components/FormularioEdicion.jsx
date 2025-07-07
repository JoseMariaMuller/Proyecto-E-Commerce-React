import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { dispararSweetBasico } from '../assets/SweetAlert';


function FormularioEdicion({ }) {
  const {admin} = useAuthContext();
  const {obtenerProductoFirebase, productoEncontrado, editarProductoF} = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  useEffect(() => {
    obtenerProductoFirebase(id).then(() => {
      //setProducto(productoEncontrado)
      setCargando(false);
    }).catch((error) => {
      if(error == "Producto no encontrado"){
        setError("Producto no encontrado")
      }
      if(error == "Hubo un error al obtener el producto."){
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
      return("El nombre es obligatorio.")
    }
    if (!producto.price || producto.price <= 0) {
      return("El precio debe ser mayor a 0.")
    }
    console.log(producto.description.trim())
    if (!producto.description.trim() || producto.description.length < 10) {
      return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!producto.imagen.trim()){
      return("La url de la imgaen no debe estar vacía")
    }
    else{
      return true
    }
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  const validarForm = validarFormulario();

  if (validarForm === true) {
    editarProductoF(producto)
      .then((prod) => {
        dispararSweetBasico(
          "Producto actualizado",
          "Los cambios fueron guardados correctamente.",
          "success",
          "Aceptar"
        );
      })
      .catch((error) => {
        dispararSweetBasico(
          "Error",
          "Hubo un problema al actualizar el producto. " + error.message,
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


 return (
  <Container className="my-5">
    {cargando ? (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando producto...</p>
      </div>
    ) : error ? (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    ) : (
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <h2 className="mb-4">Editar Producto</h2>

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
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
          <Form.Label>URL de la Imagen</Form.Label>
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
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            min="0"
            value={producto.price || ''}
            onChange={handleChange}
            required
            placeholder="Precio en ARS"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={4}
            value={producto.description || ''}
            onChange={handleChange}
            required
            placeholder="Descripción del producto"
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Actualizar Producto
          </Button>
        </div>
      </Form>
    )}
  </Container>
);

}

export default FormularioEdicion
