import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import ReportingUser from './Report/ReportingUser'
import ReportingTask from './Report/ReportingTask'
import ReportingProgress from './Report/ReportingProgress'
import { mostrarExitoEditar, selectnewRol } from '../../components/Alert/Alert'

import cargando_img1 from '../../assets/report.svg'
const USER = JSON.parse(localStorage.getItem("user"));




const ReportingPage = (props) => {
   
    const [cargando, setCargando] = useState(true);
    const [report, setReport] = useState("")
    const [user, setUser] = useState([])
    const [progreso, setProgreso] = useState([])
    let totalLibro = 5

    const selectReport = (e) => {
        setCargando(true)
        console.log(e.target.id)
        setReport(e.target.id);
        setCargando(false)
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
            return;
        }
    
        let _users = await responseUser.json()
        
        _users = JSON.parse(_users.user)
        
        setUser(_users)
        return _users
        /*
        setUsers(await _userData.filter(x => x._id !== USER._id))
        console.log('VALORES DE USER',users)
        setCargando(false);
        */
       
      }

    //const [user, setUser] = useState(getUsers()) 

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
        //progresoTotal = _progress
        //setuserProgress(_progress)
        return _progress
    }

    const llenarInfo = async () => {
        let user_ids=[]
        let user_progress = []
        let usuarios = user
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

            //console.log('TOTAL: ', total)
            user_progress.push(total)

        }

            //console.log('TOTAL: ', total)
            //    let total_sum = total.reduce((a, b) => a + b, 0);
            //    let porcentaje = (total_sum / 500)
            //    console.log('SUMADO: ', porcentaje)
            //setuserProgress(mergeBooks.libros)
            //progresoTotal.push(user_progress)
            //progresoTotal=user_progress
            setProgreso(user_progress)
            
            
            //return user_progress

    };


    useEffect(() => {
        
        //console.log('USUARIO OTRROO', user)
        //setUser()
        //llenarInfo()
        //console.log('PROGRESOS', progreso)
        
    }, [])

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        } else if (USER.rol_select !== "Administrador") {

            window.location.href = '/dashboard';
        }
        if (user.length === 0) {
            getUsers()
            console.log('hola')
        }else{
            if (progreso.length===0){
                llenarInfo()
            }
        }
        
    })

    return (
        <div>
            <NavComponent data={USER} />
            <div className="grid grid-col-2 ml-60">
                <div className="flex justify-between p-4">
                    <div>
                        <div className="dropdown relative">
                            <button
                                className=" dropdown-toggle px-4 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                type="button"
                                id="dropdownMenuButton5"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Crear Reporte
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                    ></path>
                                </svg>
                            </button>
                            <ul
                                className=" dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                                aria-labelledby="dropdownMenuButton5"
                            >

                                <li>
                                    <a
                                        onClick={selectReport} id="usuario" className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                    >Reportes de Usuarios</a>
                                </li>
                                <li>
                                    <a id="tarea" onClick={selectReport}
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                    >Reporte de Tareas</a>
                                </li>
                                <li>
                                    <a id="progreso" onClick={selectReport}
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                    >Reporte de Progreso</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="uppercase  tracking-wider text-xl font-bold">Sistema de Reportes {report!== ""? ` de ${report}`: ""}</h3>
                    </div>
                    <div>
                        {cargando ? <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500 " role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : <div> </div>}

                    </div>
                </div>
                <div className="flex justify-center">
                    {!cargando ?
                        <div className="">
                            {
                                (() => {
                                    switch (report) {
                                        case "usuario":
                                            return <ReportingUser />
                                            break;
                                        case "tarea":
                                            return <ReportingTask />
                                            break;
                                        case "progreso":
                                            return <ReportingProgress Users={user} Progresos={progreso} />
                                            break;
                                    }
                                })()
                            }
                        </div>
                        :
                        <div className="py-4 space-y-2">
                            <img src={cargando_img1} className="mr-0 pr-0" width="400px" />
                            <h2 className="text-center font-extralight italic  text-gray-700 text-2xl ">Escoge un reporte</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

export default ReportingPage;