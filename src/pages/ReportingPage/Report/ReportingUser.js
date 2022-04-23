
import React, { useState, useEffect } from "react";
import { mostrarExitoEditar } from '../../../components/Alert/Alert'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nFormatter } from '../../../helpers/fuctions'
import image_cargando from '../../../assets/undraw_charts_re_5qe9.svg'
import image_charts from '../../../assets/undraw_growing_re_olpi.svg'
import validator from 'validator'
import ReactTimeAgo from 'react-time-ago'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';

import { faTable } from "@fortawesome/free-solid-svg-icons";
ChartJS.register(...registerables);

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
        name: 'Rol',
        selector: row => row.rol,
        sortable: true
    },
    {
        name: 'Progreso %',
        selector: row => row.progreso,
        sortable: true
    },
    // {
    //     name: 'Creado',
    //     selector: row => row.createdAt,
    //     sortable: true
    // },
    

];

const ReportingUser = () => {
    const [users, setUsers] = useState([])
    const [tabla, setTabla] = useState([])
    const [progreso, setProgreso] = useState([])

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [control, setcontrol] = useState(false)
    const [cargando, setCargando] = useState(true);
    const [grafica, setGrafica] = useState(null);
    
    var formData = new FormData();
    formData.set("mode", "NO_DATE");
    let totalLibro = 5

    const getUsers = async () => {
        setCargando(true)
        let responseUser = null;
        formData.set("endDate", endDate)
        formData.set("startDate", startDate)
        formData.set("mode", checked ? "DATA" : "NO_DATE");
        try {
            responseUser = await fetch(`${process.env.REACT_APP_API_URL}user/date`, {
                method: "POST",
                body: formData,
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
        if(_users.data.length == 0){
            mostrarExitoEditar("Atención", "No existen datos a mostrar", "warning")
        }else{
            setUsers(await _users.data)
            setcontrol(true)
        }
        setCargando(false);
    }

    const getProgress = async (userid) => {
        let responseProgress = null
        try {
            responseProgress = await fetch(`${process.env.REACT_APP_API_URL}progress/${userid}`, {
                method: "POST",
                headers: {
                    token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setCargando(false);
            return;
        }

        let _progress = await responseProgress.json()
        return  _progress
    }

    const CrearTabla = async () => {
        let indice = -1

        try {
            const _userData =users.map((e) => {
                indice ++
                let User_progreso = progreso[indice]
                
                let total_sum = User_progreso.reduce((a, b) => a + b, 0);
                let calculo = (total_sum.toFixed(2) / (User_progreso.length * 100))*100
                let porcentaje = parseFloat(calculo.toFixed(2)) 
    
                return {
                    cedula: e.cedula,
                    name: e.name.toUpperCase(),
                    lastname: e.lastname.toUpperCase(),
                    mail: e.mail,
                    rol: e.rol.reduce((e1, e2) => { return `${e1}, ${e2}` }),
                    //createdAt: <ReactTimeAgo date={new Date(e.createdAt)} locale="es-EC" />,
                    progreso: porcentaje
    
                }
            })
            
            //setlibros_resueltos( Can_Libro)
            setTabla(await _userData)
            //console.log('VALORES DE USER',users)
            
            setCargando(false);
        } catch (error) {
            
        }
        

    }

    const llenarInfo = async () => {
        let user_ids=[]
        let user_progress = []
        let usuarios = users
        //console.log('USERS',usuarios)
        
        usuarios.map((e) => {
            user_ids.push(e._id)
        })
        for (let i = 0; i <  user_ids.length; i++) {
            let userInfo = await getProgress(user_ids[i]);
            let total = []
            let libroActual = 1
    
            for (let i = 0; i < userInfo.length - 1; i++) {
            for (let j = 0; j < userInfo.length - i - 1; j++) {
                if (
                parseInt(
                    "" + userInfo[j].book_info.module + userInfo[j].book_info.unit
                ) >
                parseInt(
                    "" +
                    userInfo[j + 1].book_info.module +
                    userInfo[j + 1].book_info.unit
                )
                ) {
                let aux = userInfo[j];
                userInfo[j] = userInfo[j + 1];
                userInfo[j + 1] = aux;
                }
            }
            }
    
            let mergeBooks = {libros: []};
            while(libroActual <= totalLibro){
                let librox = userInfo.filter(book => book.book_info.book === libroActual);
                let contador = 1;
                //total de modulos
                let startedmodulo = librox[0].book_info.module;
                let contador2 = startedmodulo
                let modulos = [];
                while(contador <= 2){
                let modulo = librox.filter(book => book.book_info.module === contador2);
                contador2++;
                contador++;
    
                let userprogress = (modulo[0].writing.user_progress + modulo[0].grammar.user_progress + modulo[0].reading.user_progress + modulo[0].vocabulary.user_progress);
                let total_task = (modulo[0].writing.total_task + modulo[0].grammar.total_task + modulo[0].reading.total_task + modulo[0].vocabulary.total_task);
                let progress = (userprogress / total_task) * 100;  
                
                let userprogress2 = (modulo[1].writing.user_progress + modulo[1].grammar.user_progress + modulo[1].reading.user_progress + modulo[1].vocabulary.user_progress);
                let total_task2 = (modulo[1].writing.total_task + modulo[1].grammar.total_task + modulo[1].reading.total_task + modulo[1].vocabulary.total_task);
                let progress2 = (userprogress2 / total_task2) * 100;  
                
                let totalmoduleprogress = (progress + progress2) / 2;
    
                modulos.push({modulo, totalmoduleprogress});
                }
                mergeBooks.libros.push(modulos)
                libroActual++;
            }
    
            let contadormodulos = 0;
            mergeBooks.libros.forEach((libro,index) => {
                let totaluserprogress = 0;
                let totaltask = 0;
                let totalmoduleprogress = 0;
                libro.forEach(modulo => {
                modulo.modulo.forEach(unit => {
                    totaluserprogress = totaluserprogress + (unit.grammar.user_progress + unit.reading.user_progress + unit.vocabulary.user_progress + unit.writing.user_progress);
                    totaltask = totaltask + (unit.grammar.total_task + unit.reading.total_task + unit.vocabulary.total_task + unit.writing.total_task);
                });
                });
                mergeBooks.libros[index] = {userprogress: totaluserprogress, totaltask: totaltask, modulos: mergeBooks.libros[index]}
            });
            
            //console.log('LIBROS: ', mergeBooks.libros)

            for (let i = 0; i <  mergeBooks.libros.length; i++) {
                let modulo1 = mergeBooks.libros[i].modulos[0].totalmoduleprogress;
                let modulo2= mergeBooks.libros[i].modulos[1].totalmoduleprogress;
                let totalmoduleprogress = (modulo1 + modulo2) / 2;
                total.push(parseFloat((totalmoduleprogress).toFixed(2)))
            }
            user_progress.push(total)
        }
            setProgreso( await user_progress)
            //return user_progress

    };

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setChecked(value);
    }

    const graficando = (e) => {
        let id = e.target.id;
        if (id === "graficaMail") {
            setGrafica(<Pie options={
                {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Dominios de Correos Electronicos",
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }
            } data={{
                labels: ['Dominio UTM', 'Otros Dominio'],
                datasets: [
                    {
                        label: 'Dominios de Correos Electronicos',
                        data: [users.filter(e => validator.contains(e.mail, "@utm.edu.ec")).length, users.filter(e => !validator.contains(e.mail, "@utm.edu.ec")).length],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    },
                ],

            }} />)
        } else if (id === "graficaRoles") {
            setGrafica(<Pie options={
                {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Tipos de Roles de Usuarios",
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }
            } data={{
                labels: ['Administrador', 'Docente', 'Estudiante'],
                datasets: [
                    {
                        label: 'Tipos de Roles',
                        data: [
                            users.filter(e => e.rol.find(x => x === "Administrador")).length,
                            users.filter(e => e.rol.find(x => x === "Docente")).length,
                            users.filter(e => e.rol.find(x => x === "Estudiante")).length,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 2,
                    },
                ],

            }} />)

        }
    }

    const generarReporte = () => {
        //handleChange("");
        getUsers();
        llenarInfo();
        CrearTabla();
        
    }

    useEffect(async () => {

            if (users.length!==0){
                if(progreso.length === 0){
                    llenarInfo()
                }
                if(progreso.length !== 0 && tabla.length === 0){
                    CrearTabla()
                    //console.log('SE CREO TABLA')
                }
            }
            if(control){
                llenarInfo();
                CrearTabla();
                setcontrol(false)
            }
            
        //}
        
    })

    return (
        <div>
            <div className="flex justify-between">
                <div className="px-3 py-2">
                    <div className="flex justify-center">
                        <div>
                            <div className="form-check">
                                <input onChange={handleChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                    Todos los usuarios
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    {/* Fecha inicio */}
                    <div date-rangepicker="true" className="flex items-center">
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </div>
                            <div className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">

                                <DatePicker  name="start" disabled={checked} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </div>
                            <div className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">

                                <DatePicker name="end" disabled={checked} selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mx-4">
                    {/* generar reporte */}
                    <button type="button" onClick={generarReporte} className="inline-block px-6 py-2.5 bg-yellow-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-400 active:shadow-lg transition duration-150 ease-in-out">Generar</button>
                </div>
            </div>
            <div className="grid grid-cols-1 my-4 ">
                <div className="shadow-lg bg-white rounded-lg  overflow-hidden">
                    {users.length == 0 ?
                        <div className="p-10 grid grid-cols-1 gap-4 content-center" id="chartBar">
                            <div className="mx-auto">
                                <img src={image_cargando} width="375" />
                                <h3 className="text-xl  text-center text-gray-600 my-4">Seleccione la información</h3>
                            </div>
                        </div>
                        : 
                        <div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-10 grid grid-cols-3 gap-4" id="chartBar">
                                    <div className=" border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center ">
                                        <div className="text-center">
                                            <h3 className="text-3xl uppercase text-yellow-500">{nFormatter(users.length, 1)} </h3>
                                            <h3 className="uppercase text-sm text-gray-500">Usuarios</h3>
                                        </div>

                                    </div>
                                    <div className=" col-span-2 border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center">
                                        <div className="text-center">
                                            <button type="button" onClick={graficando} id="graficaRoles" className="inline-block font-bold px-6 py-2 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Gráfica Rol de Usuarios</button>
                                        </div>
                                    </div>
                                    <div className="col-span-2  border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center ">
                                        <div className="text-center text-gray-500">
                                            <h3 className="text-md capitalize text-gray-500">Administradores <span className="font-bold  text-red-400">{nFormatter(users.filter(e => e.rol.find(x => x === "Administrador")).length, 1)}
                                            </span> </h3>
                                            <h3 className="text-1xl capitalize ">Docentes <span className="font-bold text-yellow-500">{nFormatter(users.filter(e => e.rol.find(x => x === "Docente")).length, 1)}
                                            </span> </h3>
                                            <h3 className="text-1xl capitalize ">Estudiantes <span className="font-bold text-green-500">{nFormatter(users.filter(e => e.rol.find(x => x === "Estudiante")).length, 1)}
                                            </span> </h3>
                                        </div>
                                    </div>
                                    <div className=" border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center "></div>
                                    <div className=" border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center "></div>
                                    <div className="col-span-2  border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center ">
                                        <div className="text-center">
                                            <h3 className="text-md capitalize text-gray-500">Dominio UTM <span className="font-bold  text-red-400">{nFormatter(users.filter(e => validator.contains(e.mail, "@utm.edu.ec")).length, 1)}
                                            </span> </h3>
                                            <h3 className="text-1xl capitalize text-gray-500">Otros Dominios <span className="font-bold text-yellow-500">{nFormatter(users.filter(e => !validator.contains(e.mail, "@utm.edu.ec")).length, 1)}
                                            </span> </h3>
                                            <button type="button" onClick={graficando} id="graficaMail" className="inline-block px-6 py-2 font-bold text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Gráfica</button>
                                        </div>
                                    </div>
                                </div>
                                <div className=" py-10 pr-10  grid grid-cols-1 ">
                                    <div className="border  rounded-lg border-gray-200">
                                        {grafica ? <div className="object-contain h-72 w-72 mx-auto py-2 ">{grafica} </div>
                                            : <div className=" py-10 grid grid-cols-1 gap-4 content-center" >
                                                <div className="mx-auto">
                                                    <img src={image_charts} width="375" />
                                                    <h3 className="text-xl  text-center text-gray-600 my-4">Seleccione una Gráfica</h3>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="  w-full  ">
                                    <div className="px-10 shadow-lg bg-white rounded-lg w-full overflow-hidden">
                                        {!cargando && /*console.log(userProgress)  */
                                            <div className="content-center text-center">
                                                {tabla.length == 0? 
                                                <h2> INFORMACIÓN DETALLADA <h2 className="text-green-400"> ( Cargando... )</h2>  </h2>
                                                :
                                                <h2> INFORMACIÓN DETALLADA </h2>
                                                }
                                                
                                                <DataTable
                                                    columns={columns}
                                                    data={tabla}
                                                    fixedHeaderScrollHeight="350px"
                                                    pagination
                                                    selectableRow
                                                    
                                                />

                                            </div>

                                        }
                                    </div>
                            
                                </div>
                        </div>
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default ReportingUser;