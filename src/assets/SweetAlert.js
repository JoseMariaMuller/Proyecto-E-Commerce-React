
import Swal from 'sweetalert2';


export function dispararSweetBasico(title, text, icon, confirmButtonText = 'Ok', showCancelButton = false, cancelButtonText = 'Cancelar') {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon, 
    confirmButtonText: confirmButtonText,
    
    toast: false,         
    position: 'center',   
    showConfirmButton: true, 
    showCancelButton: showCancelButton,
    cancelButtonText: cancelButtonText, 
    
    allowOutsideClick: false, 
    allowEscapeKey: false,   
    
    customClass: {
      confirmButton: 'btn btn-primary mx-2', 
      cancelButton: 'btn btn-danger mx-2'  
    },
    buttonsStyling: false 
  });
}