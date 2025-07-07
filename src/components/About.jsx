
import '../styles/About.css';

function About() {
    return (
        <section className="about-section container my-5">
            <h2 className="about-title mb-4">Sobre Nosotros</h2>

            <p className="about-text">
                En <strong>Librería Aurora</strong> creemos que cada libro es una puerta a un nuevo mundo. Somos una librería online independiente dedicada a compartir el amor por la lectura, conectando a lectores con historias que los inspiran, emocionan y transforman.
            </p>
            <p className="about-text">
                Ofrecemos una cuidada selección de títulos: desde clásicos imprescindibles hasta novedades editoriales, libros de autores emergentes, y joyas literarias difíciles de encontrar. Trabajamos con editoriales grandes y pequeñas, priorizando la diversidad y la calidad.
            </p>
            <p className="about-text">
                Nuestro compromiso es brindarte una experiencia de compra ágil, segura y cercana. Además, compartimos recomendaciones, reseñas y actividades para fomentar una comunidad de lectores apasionados.
            </p>
            <p className="about-text">
                Gracias por elegirnos. ¡Bienvenido a tu próximo capítulo!
            </p>

            <div className="accordion mt-5" id="aboutAccordion">
                {/* Nuestra Misión */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingMission">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseMission"
                            aria-expanded="true"
                            aria-controls="collapseMission"
                        >
                            Nuestra Misión
                        </button>
                    </h2>
                    <div
                        id="collapseMission"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingMission"
                    >
                        <div className="accordion-body">
                            Promover el acceso a la lectura de calidad y apoyar tanto a autores independientes como a editoriales que apuestan por la diversidad cultural. Queremos que cada lector encuentre su libro ideal y viva una experiencia única.
                        </div>
                    </div>
                </div>

                {/* ¿Qué nos hace diferentes? */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingDiferentes">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseDiferentes"
                            aria-expanded="false"
                            aria-controls="collapseDiferentes"
                        >
                            ¿Qué nos hace diferentes?
                        </button>
                    </h2>
                    <div
                        id="collapseDiferentes"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingDiferentes"
                    >
                        <div className="accordion-body">
                            <ul>
                                <li>Selección curada de libros con criterio literario y cultural.</li>
                                <li>Atención personalizada y recomendaciones según tus gustos.</li>
                                <li>Envíos rápidos, seguros y con empaques sostenibles.</li>
                                <li>Eventos virtuales como clubes de lectura, charlas con autores y más.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Conéctate con nosotros */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingConectate">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseConectate"
                            aria-expanded="false"
                            aria-controls="collapseConectate"
                        >
                            Conéctate con nosotros
                        </button>
                    </h2>
                    <div
                        id="collapseConectate"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingConectate"
                    >
                        <div className="accordion-body">
                            Síguenos en redes sociales para descubrir novedades, participar en sorteos y formar parte de una comunidad lectora que crece cada día. ¡Tu voz también cuenta!
                        </div>
                    </div>
                </div>
                {/* Nuestra Historia */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingHistoria">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseHistoria"
                            aria-expanded="false"
                            aria-controls="collapseHistoria"
                        >
                            Nuestra Historia
                        </button>
                    </h2>
                    <div
                        id="collapseHistoria"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingHistoria"
                    >
                        <div className="accordion-body">
                            <p>
                                <strong>Librería Aurora</strong> nació en 2020 como un proyecto familiar impulsado por el amor a la lectura en tiempos difíciles. Durante la pandemia, descubrimos una necesidad creciente de conexión a través de los libros. Así surgió la idea de crear un espacio donde cada lector pudiera encontrar historias que lo acompañaran, inspiraran y motivaran.
                            </p>
                            <p>
                                Lo que comenzó con un pequeño catálogo compartido en redes sociales hoy es una tienda online con una comunidad de lectores apasionados en toda Hispanoamérica.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Conoce al equipo */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingEquipo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseEquipo"
                            aria-expanded="false"
                            aria-controls="collapseEquipo"
                        >
                            Conoce al equipo
                        </button>
                    </h2>
                    <div
                        id="collapseEquipo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingEquipo"
                    >
                        <div className="accordion-body d-flex flex-column gap-3">

                            {/* Laura */}
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/150?img=47"
                                    alt="Laura"
                                    className="rounded-circle"
                                />
                                <div>
                                    <strong>Laura</strong><br />
                                    Curadora del catálogo. Selecciona títulos con una mirada diversa y literaria.
                                </div>
                            </div>

                            {/* Mateo */}
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/150?img=12"
                                    alt="Mateo"
                                    className="rounded-circle"
                                    />
                                <div>
                                    <strong>Mateo</strong><br />
                                    Atención al cliente. Siempre listo para ayudarte con lo que necesites.
                                </div>
                            </div>

                            {/* Sofía */}
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/150?img=32"
                                    alt="Sofía"
                                    className="rounded-circle"
                                />
                                <div>
                                    <strong>Sofía</strong><br />
                                    Redes y comunidad. Comparte recomendaciones y conecta lectores.
                                </div>
                            </div>

                            {/* Andrés */}
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/150?img=7"
                                    alt="Andrés"
                                    className="rounded-circle"
                                />
                                <div>
                                    <strong>Andrés</strong><br />
                                    Logística. Empaqueta cada pedido con cuidado y detalle.
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
