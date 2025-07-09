import { useState } from "react";
import { toast } from 'react-toastify';

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

    const handleSubmit = async (e) => {
        e.preventDefault();




        if (!formData.nombre.trim()) {
            toast.warn("El campo 'Nombre' no puede estar vacío. Por favor, complétalo.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Por favor, ingresa un formato de email válido. Ejemplo: tu@correo.com", {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }


        if (!formData.mensaje.trim()) {
            toast.warn("El campo 'Mensaje' no puede estar vacío. Por favor, escribe tu consulta o comentario.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }



        console.log("Mensaje enviado (simulado):", formData);

        toast.success("¡Gracias por tu mensaje! 📬 Nos pondremos en contacto pronto.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });


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

                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
            </form>
        </div>
    );
}

export default Contacto;