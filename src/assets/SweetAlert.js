import Swal from 'sweetalert2'

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
  return Swal.fire({
    title: titulo,
    text: text,
    icon: icon,
    confirmButtonText: textoBoton
  });
}
