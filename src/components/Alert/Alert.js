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

export const mostrarAlertaConfimacion = async (_title, _type, _text)=>{
    let result = await Swal.fire(
        {
            title: _title,
            type: _type,
            text: _text,
            confirmButtonText: "Continuar",
            showCancelButton: true,
        }
    )
   
    return result;
}
export const selectnewRol = async (text, rolesDis) => {

    const value = await Swal.fire({
        title: text,
        input: 'select',
        inputOptions: rolesDis,
        inputPlaceholder: 'Select a Rol',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                resolve()
            })

        }
    })
    return rolesDis[parseInt(value.value)];

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

