import Swal from "sweetalert2";


export const mostrarAlertaSalir = () => {
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

export const mostrarAlertaEliminar = async (tema) => {
    var value = await Swal.fire(
        {
            title: `Eliminar ${tema}`,
            icon: "warning",
            text: "¿Estas seguro que deseas eliminar?",
            confirmButtonText: "Continuar",
            showCancelButton: true,
        }
    )

    return value;
}
export const mostrarExitoEditar = async (titulo, text, icon) => {
    var result_data =
        await Swal.fire({
            title: titulo,
            text: text,
            icon: icon,
            showConfirmButton: true,
        })
    return result_data;

}

export const mostrarEditarPregunta = (pregunta) => {
    Swal.fire({
        title: "Editar Pregunta",
        html: `
        <div>
        <label for="swal-input1" >Data 1</label> 
        <input id="swal-input1" class="swal2-input" type="file">
        <div>
        `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
            ]
        }

    })
}