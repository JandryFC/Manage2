import Swal from "sweetalert2";


export const mostrarAlertaSalir= ()=>{
    Swal.fire(
        {
            title: "Inicio de sesión",
            type: "warning",
            text: "Actualmente existe una sesión guardada. Deseas continuar?",
            confirmButtonText: "Continuar",
            showCancelButton: true,
        }
    ).then((result) => {
        if (result.value) {
            window.location = "/dashboard";
        } else {
            localStorage.removeItem('user');
            window.location = "/";
            
        }
    });
}