import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
        if (error.code === "auth/weak-password") {
          dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
        }
      });
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Inicio de sesión exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
      });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  function logInGmail() {
    logearGmail();
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  if (user || admin) {
    return (
      <form onSubmit={handleLogout} className="text-center mt-5">
        <button type="submit" className="btn btn-danger">Cerrar sesión</button>
      </form>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={show ? iniciarSesionEmailPass : registrarUsuario}
        className="p-4 bg-white border rounded shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="mb-4 text-center">{show ? "Iniciar Sesión" : "Registrarse"}</h3>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            type="email"
            className="form-control"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            required
          />
        </div>

        <div className="d-flex justify-content-between mb-3">
          <button type="submit" className="btn btn-primary w-50 me-2">
            {show ? "Ingresar" : "Registrarse"}
          </button>
          <button className="btn btn-secondary w-50" onClick={handleShow}>
            {show ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </div>

        {show && (
          <>
            <hr />
            <button
              type="button"
              className="btn btn-outline-dark btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={logInGmail}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                width="24"
                height="24"
              />
              Iniciar sesión con Google
            </button>
          </>
        )}

      </form>
    </div>
  );
}

export default Login2;
