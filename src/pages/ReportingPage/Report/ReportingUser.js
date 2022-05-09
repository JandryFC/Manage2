
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


ChartJS.register(...registerables);

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
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "12vh"
    },
    {
        name: 'Creado',
        selector: row => row.createdAt,
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
    const [task, setTask] = useState([])
    const [openTab, setOpenTab] = React.useState(1);
    const [openTab2, setOpenTab2] = React.useState(0);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [checked, setChecked] = useState(true);
    const [cargando, setCargando] = useState(false);
    const [grafica, setGrafica] = useState(null);
    
    var formData = new FormData();
    formData.set("mode", "NO_DATE");
    let totalLibro = 5

    const getTask = async () => {
        let responseTask = null
        try {
            responseTask = await fetch(`${process.env.REACT_APP_API_URL}task/task/date`, {
                method: "GET",
                headers: {
                token: process.env.REACT_APP_SECRET_TOKEN,
                },
            }) 
        } catch (e) {
            //mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            //setCargando(false);
            return
        }
        let _task = await responseTask.json()
        setTask(await _task.data)

    }

    const getUsers = async () => {
        //setCargando(true)
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
            //mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            //setCargando(false);
            return;
        }
        
        let _users = await responseUser.json()
        setUsers(await _users.data)
        
        
        if(_users.data.length === 0){
            mostrarExitoEditar("Atención", "No existen datos a mostrar en las fechas indicadas", "warning")
        }else{
            CrearTabla(_users.data)
            //console.log('table',tabla)
        }
        
        
    }

     const CrearTabla = async (useres) => {
        let indice = -1
        
        try {
            const _userData =useres.map((e) => {
                indice ++
                let cant_resu = 0
                let resueltas = e.progress.tasks_id
                if(resueltas){
                        cant_resu=resueltas.length
                    }
                               
                let cant_task=task.length
                let calculo = (cant_resu * 100) / cant_task 
                let porcentaje = parseFloat(calculo.toFixed(2)) 
    
                return {
                    _id: e._id,
                    cedula: e.cedula,
                    name: e.name.toUpperCase(),
                    lastname: e.lastname.toUpperCase(),
                    mail: e.mail,
                    rol: e.rol.reduce((e1, e2) => { return `${e1}, ${e2}` }),
                    createdAt: <ReactTimeAgo date={new Date(e.createdAt)} locale="es-EC" />,
                    progreso: porcentaje
                }
            })
            
            setTabla(await _userData)     
            
        } catch (error) {
            
        }
        

    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setChecked(value);
    }

    const graficando = (e) => {

        let id = e
        if (id === "graficaMail") {
            setGrafica(<Pie options={
                {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Procedencia del Usuario",
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }
            } data={{
                labels: ['Usuario UTM', 'Usuario Externo'],
                datasets: [
                    {
                        label: 'Procedencia del Usuario',
                        data: [users.filter(e => validator.contains(e.mail, "@utm.edu.ec")).length, users.filter(e => !validator.contains(e.mail, "@utm.edu.ec")).length],
                        backgroundColor: [
                            'rgba(50, 205, 50, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(50, 205, 50, 1)',
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
                            users.filter(e => (e.rol).length === 1 ).length,
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

        }else if (id === "graficaProgreso") {
            setGrafica(<Pie options={
                {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Progreso de los Usuarios",
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }
            } data={{
                labels: ['Del 0% al 24%', 'Del 25% al 45%', 'Del 50% al 74%','Del 75% al 100%'],
                datasets: [
                    {
                        label: 'Progreso de los Usuarios',
                        data: [
                            tabla.filter(e => e.progreso >= 0 && e.progreso < 26 ).length,
                            tabla.filter(e => e.progreso >= 25 && e.progreso < 51 ).length,
                            tabla.filter(e => e.progreso >= 50 && e.progreso < 76 ).length,
                            tabla.filter(e => e.progreso >= 75 && e.progreso < 101 ).length,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(50,  205, 50, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(50,  205, 50, 1)'
                            
                        ],
                        borderWidth: 2,
                    },
                ],

            }} />)

        }
    }

    const generarReporte = () => {
        getUsers();
        
        //console.log('user',users)
        //console.log('task',task)
        
    }

    useEffect(async () => {
        

            if( task.length !== 0){                
            }else{
                if(task.length ===0){
                    getTask()
                }     
            }

    })

    return (
        <div className="flex flex-col items-center">
            <div className=" md:flex items-center  px-10">
                <div className="px-3 py-2">
                    <div className="flex justify-center">
                        <div>
                            <div className="form-check">
                                <input onChange={handleChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" defaultChecked />
                                <label className="text-sm form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                    VER TODO
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    {/* Fecha inicio */}
                    <div date-rangepicker="true" className="md:flex items-center">
                        <div className="">
                            <div className=" absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>
                            {checked?
                            <div className="flex bg-gray-100 border border-gray-300 text-gray-400 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">
                                 <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                <DatePicker  name="start" disabled={true} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            :
                            <div className="flex bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                <DatePicker  name="start" disabled={false} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>

                            }
                            
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="">

                            {checked?
                            <div className="flex bg-gray-100 border border-gray-300 text-gray-400 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                <DatePicker name="end" disabled={true} selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                            : 
                            <div className="flex bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                <DatePicker name="end" disabled={false} selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>

                <div className=" p-5 mx-4 text-center items-center justify-center">
                    {/* generar reporte */}
                    <button type="button" onClick={generarReporte} className="inline-block px-6 py-2.5 bg-yellow-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-400 active:shadow-lg transition duration-150 ease-in-out">Generar</button>
                </div>
            </div>
            <div className="static w-full md:w-5/6 md:p-5 ">
                <div className="flex hadow-lg bg-white md:shadow-lg rounded-lg  overflow-hidden">
                    {users.length == 0 ?
                        
                        <div className="p-10 bg-white mx-auto text-center content-center" id="chartBar">
                            <div className=" w-full ">
                                <h3 className="text-md  text-center text-gray-600 my-4">Para observar toda la información presione en ver todo, posterior a ello en el botón generar</h3>
                                <img src={image_cargando} width="375" />
                            </div>
                        </div>
                        : 
                        <div className="static w-full ">
                            
                            
                            <div className="w-full mx-auto   md:px-3">
                                    <ul
                                    className="flex mb-0 list-none pt-3 pb-4 flex-row"
                                    role="tablist"
                                    >
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a
                                        className={
                                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                            (openTab === 1
                                            ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                                            : "text-gray-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                        >
                                        <i className="fas fa-space-shuttle text-base mr-1"></i> GENERAL
                                        </a>
                                    </li>
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a
                                        className={
                                            "text-xs font-bold uppercase  py-3 shadow-lg rounded block leading-normal " +
                                            (openTab === 2
                                            ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                                            : "text-gray-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                        >
                                        <i className="fas fa-cog text-base mr-1"></i>  DETALLADO
                                        </a>
                                    </li>
                                    
                                    </ul>
                                    <div className="relative flex flex-col  break-words bg-gray-100 w-full  rounded">
                                    <div className=" py-5 flex-auto">
                                        <div className="tab-content tab-space">
                                            <div className={openTab === 1 ? "block md:px-4" : "hidden"} id="link1">
                                                <div className="relative bg-gray-100 pt-5">
                                                            <div className="px-4 md:px-10 mx-auto w-full">
                                                            <div>
                                                                {/* Card stats */}
                                                                <div className="flex flex-wrap">
                                                                <div className="w-full lg:w-6/12  px-4">
                                                                    <div className="relative  flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                                                    <div className="flex-auto p-4">
                                                                            <div className=" ">
                                                                                <h3 className="text-md font-bold  text-gray-500 py-2 ">Usuarios</h3>

                                                                                
                                                                            </div>
                                                                        <div className=" text-center">
                                                                            <h3 className="text-3xl uppercase text-yellow-500">{nFormatter(users.length, 1)} </h3>
                                                                        <h3 className="uppercase text-sm text-gray-500">___</h3>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full lg:w-6/12  px-4">
                                                                    <div className="relative  flex flex-col min-w-0 break-words bg-white rounded mb-6  shadow-lg">
                                                                        <div className="flex-auto p-4">
                                                                            <div className=" ">
                                                                                <h3 className="text-md font-bold  text-gray-500 py-2 ">Roles de los Usuarios</h3>

                                                                                <div className=" md:flex justify-center ">
                                                                                    
                                                                                    <div className="md:pr-7">
                                                                                        <h3 className="text-1xl capitalize text-gray-500 ">Estudiantes <span className="font-bold text-yellow-400">{nFormatter(users.filter(e => (e.rol).length === 1 ).length, 1)}
                                                                                        </span> </h3>
                                                                                    </div>
                                                                                    <div>
                                                                                        <h3 className="text-1xl capitalize text-gray-500 ">Docentes <span className="font-bold text-blue-500">{nFormatter(users.filter(e => e.rol.find(x => x === "Docente")).length, 1)}
                                                                                        </span> </h3>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                                <div className="text-center pb-2"> 
                                                                                        <h3 className="text-md capitalize text-gray-500">Administradores <span className="font-bold  text-red-400">{nFormatter(users.filter(e => e.rol.find(x => x === "Administrador")).length, 1)}
                                                                                        </span> </h3>
                                                                                    </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full lg:w-6/12  px-4">
                                                                    <div className="relative  flex flex-col min-w-0 break-words bg-white rounded mb-6  shadow-lg">
                                                                        <div className="flex-auto p-4">
                                                                            <div className=" ">
                                                                                <h3 className="text-md font-bold  text-gray-500 py-2 ">Procedencia de los Usuarios</h3>

                                                                                <div className=" justify-center  ">
                                                                                    
                                                                                    <div className="text-center md:pr-7">
                                                                                        <h3 className="text-1xl capitalize text-gray-500 ">Usuarios UTM <span className="font-bold text-yellow-400">{nFormatter(users.filter(e => validator.contains(e.mail, "@utm.edu.ec")).length, 1)}
                                                                                        </span> </h3>
                                                                                    </div>
                                                                                    <div className="text-center pb-2"> 
                                                                                        <h3 className="text-md capitalize text-gray-500">Usuarios Externos <span className="font-bold  text-red-400">{nFormatter(users.filter(e => !validator.contains(e.mail, "@utm.edu.ec")).length, 1)}
                                                                                        </span> </h3>
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full lg:w-6/12  px-4">
                                                                    <div className="relative  flex flex-col min-w-0 break-words bg-white rounded mb-6  shadow-lg">
                                                                        <div className="flex-auto p-4">
                                                                            <div className=" ">
                                                                            <h3 className="text-md font-bold text-gray-500 py-2 ">Progreso de los Usuarios</h3>

                                                                            <div className="grid grid-cols-2  px-3">
                                                                                <div>
                                                                                    <h3 className="text-1xl capitalize  text-gray-500"> 0 - 25 % = <span className="font-bold text-red-400">{tabla.filter(e => e.progreso >= 0 && e.progreso < 26 ).length}
                                                                                    </span> </h3>
                                                                                </div>
                                                                                <div>
                                                                                    <h3 className="text-1xl capitalize text-gray-500"> 26% - 50 % =  <span className="font-bold text-blue-500">{tabla.filter(e => e.progreso > 25 && e.progreso < 51 ).length}
                                                                                    </span> </h3>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                            <div className="grid grid-cols-2  px-3 pb-2">
                                                                                <div>
                                                                                    <h3 className="text-1xl capitalize text-gray-500"> 51 - 75 % = <span className="font-bold text-yellow-400">{tabla.filter(e => e.progreso > 50 && e.progreso < 76 ).length}
                                                                                    </span> </h3>
                                                                                </div>
                                                                                <div>
                                                                                    <h3 className="text-1xl capitalize text-gray-500"> 76 - 100 % =  <span className="font-bold text-green-500">{tabla.filter(e => e.progreso > 75 && e.progreso < 101 ).length}
                                                                                    </span> </h3>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full px-4">
                                                    
                                                    <div className=" bg-white  pt-2 md:pt-0 p-2 md:p rounded-lg content-center  ">
                                                        <div id='grafica' className=" md:p-5   ">
                                                        <ul
                                    className="flex "
                                    role="tablist"
                                    >
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                                        <a
                                        className={
                                            "text-xs font-bold uppercase md:px-5 py-3 shadow-md rounded block leading-normal " +
                                            (openTab2 === 1
                                            ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                                            : "text-gray-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab2(1);
                                            graficando('graficaRoles');
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                        >
                                        <i className="fas fa-space-shuttle text-base mr-1"></i> Roles
                                        </a>
                                    </li>

                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a 
                                        id="graficaRoles"
                                        className={
                                            "text-xs font-bold uppercase md:px-5 py-3 shadow-md rounded block leading-normal " +
                                            (openTab2 === 2
                                            ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                                            : "text-gray-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab2(2);
                                            graficando('graficaMail');
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                        >
                                        <i className="fas fa-cog text-base mr-1"></i>  Procedencias
                                        </a>
                                    </li>
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a
                                        className={
                                            "text-xs font-bold uppercase md:px-5 py-3 shadow-md rounded block leading-normal " +
                                            (openTab2 === 3
                                            ? "text-yellow-500 bg-gray-100 bg-gradient-to-t from-gray-100"
                                            : "text-gray-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab2(3);
                                            graficando('graficaProgreso');
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                        >
                                        <i className="fas fa-cog text-base mr-1"></i>  Progresos
                                        </a>
                                    </li>
                                    
                                    </ul>
                                                            {grafica ? <div className="object-contain pt-5 md:w-80 max-w-xs mx-auto   "><div className="">{grafica}</div> </div>
                                                                : <div className="  py-10 grid pt-5 grid-cols-1 gap-4 content-center" >
                                                                    <div className="mx-auto">
                                                                        <img src={image_charts} width="375" />
                                                                        <h3 className="text-xl  text-center text-gray-600 my-4">Seleccione la gráfica a generar</h3>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>   
                                                                </div>
                                                            </div>
                                                            </div>
                                                </div>
                                            </div>
                                            <div className={openTab === 2 ? "block bg-gray-50" : "hidden"} id="link2">
                                            <div className=" relative bg-gray-100 p-5   ">
                                                        <div className="  bg-white  shadow-lg w-full rounded-lg w-full overflow-hidden">
                                                            {!cargando && /*console.log(userProgress)  */
                                                                <div className="content-center pt-2 items-center w-full justify-center text-center">
                                                                    {tabla.length == 0? 
                                                                    <h2> INFORMACIÓN DETALLADA <h2 className="text-green-400"> ( Cargando... )</h2>  </h2>
                                                                    :
                                                                    <h2> INFORMACIÓN DETALLADA </h2>
                                                                    }
                                                                    <div className="  px-2 table-responsive">
                                                                    <DataTable
                                                                        columns={columns}
                                                                        data={tabla}
                                                                        fixedHeaderScrollHeight="350px"
                                                                        pagination
                                                                        selectableRow
                                                                        
                                                                    />
                                                                    </div>

                                                                </div>

                                                            }
                                                        </div>
                                                
                                                </div>
                                            </div>
                                    </div>
                                    </div>
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