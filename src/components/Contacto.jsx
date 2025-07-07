import { useState } from "react";


function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías mandar el formData a un backend, email, etc.
        console.log("Mensaje enviado:", formData);
        alert("¡Gracias por tu mensaje! 📬");
        setFormData({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Contacto</h2>
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                    <textarea
                        className="form-control"
                        id="mensaje"
                        name="mensaje"
                        rows="4"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
            </form>
        </div>
    );
}

export default Contacto;
