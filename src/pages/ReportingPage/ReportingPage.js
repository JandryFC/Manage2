import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import ReportingUser from './Report/ReportingUser'
import ReportingTask from './Report/ReportingTask'


import cargando_img1 from '../../assets/report.svg'
const USER = JSON.parse(localStorage.getItem("user"));




const ReportingPage = (props) => {
   
    const [cargando, setCargando] = useState(true);
    const [report, setReport] = useState("")

    const selectReport = (e) => {
        setCargando(true)
        console.log('ID',e.target.id)
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
        <div >
            <NavComponent data={USER} />
            <div className="flex flex-col w-full bg-gray-50">
            <div className="relative pt-10 pb-8 flex content-center items-center justify-center min-h-screen-75">
            <div
                className="absolute top-0 w-full h-full bg-center bg-white shadow-md border "
                
            >
                <span
                id="blackOverlay"
                className="w-full h-full absolute "
                ></span>
            </div>
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                    <div className="md:pb-5">
                    <h1 className="font-semibold text-2xl md:text-4xl">
                    REPORTES
                    </h1>
                    <div className="mx-auto pt-5">
                                    <button
                                        className=" dropdown-toggle px-4 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg active:text-white transition duration-150 ease-in-out  items-center whitespace-nowrap"
                                        type="button"
                                        id="dropdownMenuButton5"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Seleccionar Reporte
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
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
                                            <button
                                                onClick={selectReport} id="usuario" className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            >Reportes de Usuarios</button>
                                        </li>
                                        <li>
                                            <button id="libro" onClick={selectReport}
                                                className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            >Reporte de Libros</button>
                                        </li>
                                    </ul>
                                </div>
                    </div>
                </div>
                
                </div>
                
            </div>
          

            </div>

                <div className="h-full">
                    {!cargando ?
                        <div className="text-center py-2 items-center justify-center">
                            <div className="pt-4">
                                    <h3 className="uppercase  tracking-wider text-xl font-bold">  {report!== ""? `Reportes de ${report}`: ""}</h3>
                            </div>
                            {
                                (() => {
                                    switch (report) {
                                        case "usuario":
                                            return <ReportingUser />
                                            break;
                                        case "libro":
                                            return <ReportingTask />
                                            break;
                                    }
                                })()
                            }
                        </div>
                        :
                        
                        <div className="flex flex-wrap items-center mt-5">
                            <div className="w-full md:w-5/12 w-1/12 px-4 mr-auto ml-auto">
                                <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 ">
                                <img
                                    alt="..."
                                    src={cargando_img1}                    
                                    className="align-middle rounded-t-lg"
                                />

                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
        </div>
    )

}

export default ReportingPage;