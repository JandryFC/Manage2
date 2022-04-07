
import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import { mostrarExitoEditar, selectnewRol } from '../../components/Alert/Alert'
import ReactTimeAgo from 'react-time-ago'
import DataTable from 'react-data-table-component';
const USER = JSON.parse(localStorage.getItem("user"));

const columns = [
    {
        name: 'Id',
        selector: row => row._id,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "8vh"
    },
    {
        name: 'Cédula',
        selector: row => row.cedula,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "40vh"

    },
    {
        name: 'Nombre',
        selector: row => row.name,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "70vh"

    },

    {
        name: 'Apellido',
        selector: row => row.lastname,
        sortable: true
    },
    {
        name: 'Correo',
        selector: row => row.mail,
        sortable: true
    },
    {
        name: 'Rol',
        selector: row => row.rol,
        sortable: true
    },
    {
        name: 'Creado',
        selector: row => row.createdAt,
        sortable: true
    },

];
const PrivilegesPage = () => {

    const [users, setUsers] = useState([])
    const [cargando, setCargando] = useState(true);
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggleCleared, setToggleCleared] = React.useState(false);

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        } else if (USER.rol_select !== "Administrador") {

            window.location.href = '/dashboard';
        }
    })

    const getUsers = async () => {
        let responseUser = null
        try {
            responseUser = await fetch(`${process.env.REACT_APP_API_URL}user/`, {
                method: "GET",
                headers: {
                    token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setCargando(false);
            return;
        }

        let _users = await responseUser.json()
        _users = JSON.parse(_users.user)

        const _userData = _users.map((e) => {
            return {
                _id: e._id,
                cedula: e.cedula,
                name: e.name,
                lastname: e.lastname,
                mail: e.mail,
                rol: e.rol.reduce((e1, e2) => { return `${e1}, ${e2}` }),
                createdAt: <ReactTimeAgo date={new Date(e.createdAt)} locale="es-EC" />

            }
        })
        setUsers(await _userData.filter(x => x._id !== USER._id))
        setCargando(false);

    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {

        const handleNewRol = async () => {
            const rolesUser = selectedRows[0].rol.split(", ");
            const conjuntoRolesUser = new Set(rolesUser);
            const conjutoRolesDisp = new Set(["Administrador", "Estudiante", "Docente"]);
            const conjuntoDiferencia = new Set([...conjutoRolesDisp].filter(x => !conjuntoRolesUser.has(x)))
            const rolsSelc = [...conjuntoDiferencia].filter(x => x !== "Estudiante")
            if (rolsSelc.length == 0) {
                mostrarExitoEditar("Atención", "Usted ya tiene todos los roles disponibles", "info")
                return
            } else {
                const rolAdd = await selectnewRol("Agregar Roles", rolsSelc);
                let updateUser = null;
                if (rolAdd) {
                    try {
                        updateUser = await fetch(`${process.env.REACT_APP_API_URL}user/update/rol`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                token: process.env.REACT_APP_SECRET_TOKEN,
                            },
                            body: JSON.stringify({
                                rol: rolAdd,
                                _id: selectedRows[0]._id,
                                option: "EDIT"
                            })
                        })
                    } catch (e) {
                        mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
                        return
                    }
                } else {
                    return
                }
                const _updateUser = await updateUser.json();
                if (_updateUser.msg === "CORRECT") {
                    mostrarExitoEditar("Exito", "El Rol fue actualizado correctamente", "success")
                    getUsers();
                } else {
                    mostrarExitoEditar("Error", "El Rol no pudo ser actualizado correctamente", "error")

                }
            }
        }
        const handleEditRol = async () => {
            const rolesUser = selectedRows[0].rol.split(", ");
            const rolAdd = await selectnewRol("Eliminar Roles", rolesUser.filter(x => x !== "Estudiante"));
            let updateUser = null
            if (rolAdd) {

                try {
                    updateUser = await fetch(`${process.env.REACT_APP_API_URL}user/update/rol`, {
                        method: "POST",
                        /* headers: {
                        },*/
                        headers: {
                            token: process.env.REACT_APP_SECRET_TOKEN,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            rol: rolAdd,
                            _id: selectedRows[0]._id,
                            option: "DELETE"
                        })
                    })
                } catch (e) {
                    mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
                    return
                }
            } else {
                return
            }
            const _updateUser = await updateUser.json();
            console.log(_updateUser)
            if (_updateUser.msg === "CORRECT") {
                mostrarExitoEditar("Exito", "El Rol fue actualizado correctamente", "success")
                getUsers();
            } else {
                mostrarExitoEditar("Error", "El Rol no pudo ser actualizado correctamente", "error")

            }

        };

        return (
            <div className="space-x-4">
                <button key="edit" onClick={handleNewRol} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border border-green-500 rounded">
                    Nuevo rol
                </button>
                <button key="delete" onClick={handleEditRol} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border border-red-500 rounded">
                    Editar roles
                </button>
            </div>
        );
    }, [users, selectedRows, toggleCleared]);

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <NavComponent data={USER} />
            <div className="grid grid-col-2 ml-60">
                <div className="flex justify-between p-4">
                    <div></div>
                    <div>
                        <h3 className="uppercase  tracking-wider text-xl font-bold">Usuarios con Privilegios </h3>
                    </div>
                    <div>
                        {cargando ? <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500 " role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : <div> </div>}

                    </div>
                </div>
                <div>
                    {!cargando && /*console.log(userProgress)  */
                        <div className="">

                            <DataTable
                                title="Lista de Usuarios"
                                columns={columns}
                                data={users}
                                fixedHeader={true}
                                fixedHeaderScrollHeight="350px"
                                pagination
                                selectableRows

                                contextActions={contextActions}
                                selectableRowsSingle={true}
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                            />
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default PrivilegesPage;