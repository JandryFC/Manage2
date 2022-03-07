import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import ReportingUser from './Report/ReportingUser'
import ReportingTask from './Report/ReportingTask'
import { mostrarExitoEditar } from '../../components/Alert/Alert'

import cargando_img1 from '../../assets/report.svg'
const USER = JSON.parse(localStorage.getItem("user"));
const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";


const ReportingPage = (props) => {
    const [users, setUsers] = useState([])
    const [cargando, setCargando] = useState(true);
    const [report, setReport] = useState("")

    const getUsers = async () => {
        let responseUser = null
        try {
            responseUser = await fetch(`${API_URL}user`, {
                method: "GET",
                /* headers: {
                  token: API_KEY,
                }, */
            })

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setCargando(false);
            return;
        }

        let _users = await responseUser.json()
        setUsers(await _users)
        setCargando(false);
    }
    const selectReport = (e) => {
        setCargando(true)
        console.log(e.target.id)
        setReport(e.target.id);
        setCargando(false)
    }

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        } else if (USER.rol_select !== "Administrador") {

            window.location.href = '/dashboard';
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
                                        onClick={selectReport} id="reporting_user" className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                    >Reportes de Usuarios</a>
                                </li>
                                <li>
                                    <a id="reporting_task" onClick={selectReport}
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                    >Reporte de Tareas</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="uppercase  tracking-wider text-xl font-bold">Sistema de Reportes </h3>
                    </div>
                    <div>
                        {cargando ? <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500 " role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : <div> </div>}

                    </div>
                </div>
                <div className="flex justify-center p-4">
                    {!cargando ?
                        <div className="">
                            {
                                (() => {
                                    switch (report) {
                                        case "reporting_user":
                                            return <ReportingUser />
                                            break;
                                        case "reporting_task":
                                            return <ReportingTask />
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