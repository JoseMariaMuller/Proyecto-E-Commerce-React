import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [errorLogin, setErrorLogin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  async function registrarUsuario(e) {
    e.preventDefault();
    setErrorLogin(null);
    try {
      await crearUsuario(usuario, password);
      login(usuario);
      dispararSweetBasico("Registro exitoso", "¡Bienvenido a Librería Aurora!", "success", "Confirmar");
    } catch (error) {
      console.error("Error al registrar:", error);
      if (error.code === "auth/invalid-credential") {
        dispararSweetBasico("Credenciales incorrectas", "El email o la contraseña son incorrectos.", "error", "Cerrar");
      } else if (error.code === "auth/email-already-in-use") {
        dispararSweetBasico("Email ya registrado", "Este email ya está en uso. Intenta iniciar sesión.", "error", "Cerrar");
      } else if (error.code === "auth/weak-password") {
        dispararSweetBasico("Contraseña débil", "La contraseña debe tener al menos 6 caracteres.", "error", "Cerrar");
      } else {
        dispararSweetBasico("Error de registro", "Hubo un problema al registrarte. Intenta de nuevo.", "error", "Cerrar");
      }
      setErrorLogin(error.message);
    }
  }

  async function iniciarSesionEmailPass(e) {
    e.preventDefault();
    setErrorLogin(null);
    try {
      await loginEmailPass(usuario, password);
      login(usuario);
      dispararSweetBasico("Inicio de sesión exitoso", "¡Bienvenido de nuevo!", "success", "Confirmar");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.code === "auth/invalid-credential") {
        dispararSweetBasico("Credenciales incorrectas", "El email o la contraseña son incorrectos.", "error", "Cerrar");
      } else if (error.code === "auth/user-disabled") {
        dispararSweetBasico("Usuario deshabilitado", "Tu cuenta ha sido deshabilitada.", "error", "Cerrar");
      } else {
        dispararSweetBasico("Error de inicio de sesión", "Hubo un problema al iniciar sesión. Intenta de nuevo.", "error", "Cerrar");
      }
      setErrorLogin(error.message);
    }
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
    setUsuario('');
    setPassword('');
    setErrorLogin(null);
  }

  function logInGmail() {
    logearGmail()
      .then(() => {
        dispararSweetBasico("Inicio de sesión exitoso", "¡Bienvenido!", "success", "Confirmar");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con Gmail:", error);
        dispararSweetBasico("Error con Google", "No se pudo iniciar sesión con Google. Intenta de nuevo.", "error", "Cerrar");
        setErrorLogin(error.message);
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (user || admin) {
    return (
      <Container className="my-5 text-center">
        <h3 className="mb-4">Ya has iniciado sesión como: {user}</h3>
        {admin && <p className="text-success">¡Eres un administrador!</p>}
        <Button variant="danger" onClick={handleLogout} className="mt-3">Cerrar sesión</Button>
      </Container>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Container>
        <div className="w-100 mx-auto" style={{ maxWidth: "700px" }}>
          <Form onSubmit={show ? iniciarSesionEmailPass : registrarUsuario} className="shadow p-4 rounded bg-light">
            <h3 className="mb-4 text-center">{show ? "Iniciar Sesión" : "Registrarse"}</h3>

            {errorLogin && (
              <Alert variant="danger" className="mb-3">
                {errorLogin}
              </Alert>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                type="email"
                autoComplete="username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  autoComplete={show ? "current-password" : "new-password"}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-fill"></i> 
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i> 
                  )}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Button type="submit" variant="primary" className="w-50 me-2">
                {show ? "Ingresar" : "Registrarse"}
              </Button>
              <Button variant="secondary" className="w-50" onClick={handleShow}>
                {show ? "Registrarse" : "Iniciar Sesión"}
              </Button>
            </div>

            {show && (
              <>
                <hr />
                <Button
                  type="button"
                  variant="outline-dark"
                  className="w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={logInGmail}
                  size="lg"
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google logo"
                    width="24"
                    height="24"
                  />
                  Iniciar sesión con Google
                </Button>
              </>
            )}
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login2;