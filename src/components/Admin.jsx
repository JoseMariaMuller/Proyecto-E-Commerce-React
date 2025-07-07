import { Navigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";


export default function Admin() {
    const { admin } = useAuthContext();

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Panel de Administración</h2>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Productos</h5>
                            <p className="card-text">Agregar, editar o eliminar productos del catálogo.</p>
                            <Link to="/admin/agregarProductos" className="btn btn-primary">
                                Agregar Producto
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
