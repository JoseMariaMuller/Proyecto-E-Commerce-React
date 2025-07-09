// src/utils/ScrollToTop.jsx o src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation(); // Obtiene la ruta actual

    useEffect(() => {
        // Cada vez que 'pathname' (la ruta) cambie, hacemos scroll al principio
        window.scrollTo(0, 0);
    }, [pathname]); // Dependencia del efecto: se ejecuta cuando 'pathname' cambia

    return null; // Este componente no renderiza nada en el DOM
}

export default ScrollToTop;