import "../styles/Login.css";

export default function Login({ user, admin, setLogeadoUser, setLogeadoAdmin }) {
    return (
        <div className="login-container">
            <button
                className={`login-button ${user ? "login-button-active" : ""}`}
                onClick={() => setLogeadoUser(!user)}
            >
                {user ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
            <button
                className={`login-button login-button-admin ${admin ? "login-button-active" : ""
                    }`}
                onClick={() => setLogeadoAdmin(!admin)}
            >
                {admin ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
            </button>
        </div>
    );
}