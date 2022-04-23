
import React, { useState, useEffect } from "react";
import { mostrarExitoEditar, selectnewRol } from '../../../components/Alert/Alert'
import ReactTimeAgo from 'react-time-ago'
import DataTable from 'react-data-table-component';
const USER = JSON.parse(localStorage.getItem("user"));
let progresoTotal = []

const columns = [

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
        maxWidth: "vh"

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
        name: 'Creado',
        selector: row => row.createdAt,
        sortable: true
    },
    {
        name: 'Progreso %',
        selector: row => row.progreso,
        sortable: true
    },

];


const ReportingProgress = (props) => {

    const [users, setUsers] = useState([])
    const [cargando, setCargando] = useState(true);
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [libros_resueltos, setlibros_resueltos] = useState([]);
    const  [userProgress, setuserProgress] = useState([]);
    
    
    let totalLibro = 5;

    useEffect(async () => {

        if (!USER) {
            window.location.href = '/';
        } else if (USER.rol_select !== "Administrador") {

            window.location.href = '/dashboard';
        }
    })

    const getUsers = async () => {
        let indice = -1
        let Can_Libro = []
        for (let i = 0; i <  props.Progresos[0].length; i++) {
            Can_Libro.push(0)
        }

        const _userData = props.Users.map((e) => {
            indice ++
            let User_progreso = props.Progresos[indice]
            
            for (let i = 0; i <  User_progreso.length; i++) {
                if(User_progreso[i] === 100){
                    Can_Libro[i]++
                }
            }
            
            let total_sum = User_progreso.reduce((a, b) => a + b, 0);
            let calculo = (total_sum.toFixed(2) / (User_progreso.length * 100))*100
            let porcentaje = parseFloat(calculo.toFixed(2)) 

            return {
                cedula: e.cedula,
                name: e.name.toUpperCase(),
                lastname: e.lastname.toUpperCase(),
                mail: e.mail,
                createdAt: <ReactTimeAgo date={new Date(e.createdAt)} locale="es-EC" />,
                progreso: porcentaje

            }
        })
        
        //setlibros_resueltos( Can_Libro)
        setUsers(await _userData)
        //console.log('VALORES DE USER',users)
        setCargando(false);

    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    useEffect(() => {
        
        //ValoresProgreso(props.Users)
       // progresoTotal=llenarInfo(props.Users)
       console.log('Usuarios',props.Users) 
       console.log('Progresos',props.Progresos)
       getUsers()
       console.log('Libros Resueltos: ',libros_resueltos)
        // llenarInfo(2)
        // let total_sum = progreso.reduce((a, b) => a + b, 0);
        // let porcentaje = (total_sum / 500)
        //     console.log('SUMADO: ', porcentaje)
        
    }, [])

    return (
        <div>
                <div className="shadow-lg bg-white rounded-lg w-full overflow-hidden">
                    {!cargando && /*console.log(userProgress)  */
                        <div className="">

                            <DataTable
                                title="Lista de Usuarios"
                                columns={columns}
                                data={users}
                                fixedHeaderScrollHeight="350px"
                                pagination
                                selectableRows


                                selectableRowsSingle={true}
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                            />

                        </div>

                    }
                </div>
           
        </div>
    )
}

export default ReportingProgress;