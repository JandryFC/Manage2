
import React, { Component,useState, useEffect } from "react";
import { mostrarExitoEditar, selectnewRol } from '../../components/Alert/Alert'
import ReactTimeAgo from 'react-time-ago'
import NavComponent from "../../components/NavComponent/NavComponent";
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
    const [DataBusqueda, setDataBusqueda] = React.useState([]);
    const [ValorBusqueda, setValorBusqueda] = React.useState('');

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        } else if (USER.rol_select !== "Administrador") {

            window.location.href = '/dashboard';
        }
    })

     const onChange=async e=>{
        e.persist();
        await setValorBusqueda(e.target.value);
        let palabra = e.target.value 
        filtrarElementos(palabra.toLowerCase());
      }

      const filtrarElementos=(busq)=>{
        var search=users.filter(item=>{
          if(item.cedula.toString().includes(busq) ||
          item.mail.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busq) 
          ){
            return item;
          }
        });
        setDataBusqueda(search);
      }
    

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
        let n_id = 0
        const _userData = _users.map((e) => {
            n_id = n_id + 1
            return {
                _id: e._id,
                id:n_id,
                cedula: e.cedula,
                name: e.name.toUpperCase() ,
                lastname: e.lastname.toUpperCase() ,
                mail: e.mail,
                rol: e.rol.reduce((e1, e2) => { return `${e1}, ${e2}` }),
                createdAt: <ReactTimeAgo date={new Date(e.createdAt)} locale="es-EC" />

            }
        })
        setUsers(await _userData.filter(x => x._id !== USER._id && x.mail !== 'jandrixf@gmail.com' ))
        setDataBusqueda(await _userData.filter(x => x._id !== USER._id && x.mail !== 'jandrixf@gmail.com'))
        setCargando(false);

    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const borrar=()=>{
        setValorBusqueda('')
        setDataBusqueda(users)
    }

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
            <div className="md:space-x-4 ">
                <div className="flex">
                    <div className="p-2"> 
                        <button key="edit" onClick={handleNewRol} className="bg-green-500 hover:bg-green-400 text-white font-bold md:py-2 px-4 border border-green-500 rounded">
                            Nuevo rol
                        </button>
                    </div>
                    <div className="p-2"> 
                        <button key="delete" onClick={handleEditRol} className="bg-red-500 hover:bg-red-400 text-white font-bold md:py-2 px-4 border border-red-500 rounded">
                            Editar roles
                        </button>
                    </div>
                </div>
            </div>
        );
    }, [DataBusqueda, selectedRows, toggleCleared]);

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div>
            <NavComponent data={USER} />
            <div className=" "> 
                <div className=" p-10">
                    <div className="flex justify-between p-4">
                        <div></div>
                        <div>
                            <h3 className="text-center uppercase  tracking-wider text-xl font-bold">Gestión de Privilegios </h3>
                            <h3 className=" text-center font-bold py-2 lg:text-xs md:text-xs text-xs   font-sans text-gray-500 ">
                                Seleccione la casilla del usuario al que desee asignar o quitar privilegios
                            </h3>      

                        </div>
                        
                        <div>
                            {cargando ? <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500 " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : <div> </div>}

                        </div>
                    </div>
                    <div className="p-5"> 
                        {!cargando && /*console.log(userProgress)  */
                            <div className="table-responsive">
                                <div className="barraBusqueda ">
                                    <input
                                    type="text"
                                    placeholder="Buscar C.I. o Correo"
                                    className="textField border border-gray-200 rounded-lg py-1 pl-5"
                                    name="busqueda"
                                    value={ValorBusqueda}
                                    onChange={onChange}
                                    />
                                    <button onClick={borrar} type="button"  className="bg-yellow-200 text-gray-500 px-5 dark:text-white hover:bg-yellow-500 hover:text-white inline-flex items-center justify-center p-1 rounded-md focus:outline-none"
 /*onClick={onClear}*/>
                                    {"x "}
                                    {/*<FontAwesomeIcon icon={faSearch} />*/}
                                    </button>
                                </div>
                                <h2 className="py-2"></h2>
                                <DataTable
                                    title="Lista de Usuarios"
                                    columns={columns}
                                    data={DataBusqueda}
                                    fixedHeader={true}
                                    fixedHeaderScrollHeight="350px"
                                    pagination
                                    selectableRows
                                    

                                    noDataComponent={<span>No se encontró ningún elemento</span>}

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
        </div>
    )
}

export default PrivilegesPage;