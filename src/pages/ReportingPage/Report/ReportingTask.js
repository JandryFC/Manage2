
import React, { useState } from "react";
import { mostrarExitoEditar } from '../../../components/Alert/Alert'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nFormatter } from '../../../helpers/fuctions'
import image_cargando from '../../../assets/undraw_charts_re_5qe9.svg'
import image_charts from '../../../assets/undraw_growing_re_olpi.svg'

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { Pie, Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const ReportingTask = () => {
    const [task, setTask] = useState([]);
    const [progress, setProgress] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [checked, setChecked] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [grafica, setGrafica] = useState(null);
    var formData = new FormData();
    formData.set("mode", "NO_DATE");


    const getTask = async () => {
        setCargando(true)
        let responseTask = null;
        let responseProgress = null;
        formData.set("endDate", endDate)
        formData.set("startDate", startDate)
        formData.set("mode", checked ? "DATA" : "NO_DATE");
        try {
            responseTask = await fetch(`${process.env.REACT_APP_API_URL}task/date`, {
                method: "GET"
                /* headers: {
                  token: API_KEY,
                }, */
            })

            responseProgress = await fetch(`${process.env.REACT_APP_API_URL}user/date`, {
                method: "POST",
                body: formData
                /* headers: {
                  token: API_KEY,
                }, */
            })

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setCargando(false);
            return;
        }

        let _task = await responseTask.json()
        let _userProgress = await responseProgress.json();
        if (_task.data.length == 0 || _userProgress.data.length == 0) {
            mostrarExitoEditar("Atención", "No existen datos a mostrar", "warning")
        } else {
            setProgress(_userProgress.data.map(e => { return { name: `${e.name} ${e.lastname}`, progress: e.progress } }))
            setTask(_task.data)
        }
        setCargando(false);
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setChecked(value);

    }

    const generarReporte = () => {
        getTask();
    }


    const graficando = (e) => {
        let id = e.target.id;
        switch (id) {
            case "graficaProgresso":
                setGrafica(
                    <Bar
                        data={
                            {
                                labels: ['January', 'February', 'March',
                                    'April', 'May'],
                                datasets: [
                                    {
                                        label: 'Rainfall',
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgba(0,0,0,1)',
                                        borderWidth: 2,
                                        data: [65, 59, 80, 81, 56]
                                    }
                                ]
                            }
                        }
                        options={
                            {
                                title: {
                                    display: true,
                                    text: 'Average Rainfall per month',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }, 
                                
                            }}
                    />)
                break;
            case "graficaTipos":
                setGrafica(<Pie
                    options={
                        {
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Tipos de Tareas",
                                    fontSize: 25,
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        }
                    } data={{
                        labels: ['Writing', 'Reading', 'Grammar', 'Vocabulary'],
                        datasets: [
                            {
                                label: 'Tipos de Tareas',
                                data: [
                                    task.filter(e => e.type === "writing").length,
                                    task.filter(e => e.type === "reading").length,
                                    task.filter(e => e.type === "grammar").length,
                                    task.filter(e => e.type === "vocabulary").length
                                ],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1,
                            },
                        ],

                    }} />)

                break;

            default:
                break;
        }

    }

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <div className="px-3 py-2 ">
                    <div className="flex justify-center">
                        <div>
                            <div className="form-check">
                                <input onChange={handleChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                    Todas las Tareas
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    {/* Fecha inicio */}
                    {console.log(progress)}
                    <div date-rangepicker="true" className="flex items-center">
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </div>
                            <div className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input">

                                <DatePicker name="start" disabled={checked} selected={startDate} onChange={(date) => setStartDate(date)} />
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
            <div className="grid grid-cols-1 my-4">
                <div className="shadow-lg bg-white rounded-lg h-96 overflow-hidden">
                    {task.length == 0 ?
                        <div className="p-10 grid grid-cols-1 gap-4 content-center" id="chartBar">
                            <div className="mx-auto">
                                <img src={image_cargando} width="375" />
                                <h3 className="text-xl  text-center text-gray-600 my-4">Seleccione la información</h3>
                            </div>
                        </div>
                        : <div className="grid grid-cols-2 gap-4">
                            <div className="p-10 grid grid-cols-3 gap-4" id="chartBar">
                                <div className=" border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center">
                                        <h3 className="text-3xl uppercase text-yellow-500">{nFormatter(task.length, 1)} </h3>
                                        <h3 className="uppercase text-sm text-gray-500">Tareas</h3>
                                    </div>

                                </div>
                                <div className=" col-span-2 border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center">
                                    <div className="text-center">

                                        <button type="button" onClick={graficando} id="graficaProgresso" class="inline-block font-bold px-6 py-2 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Gráfica Progreso de Tareas</button>
                                    </div>
                                </div>
                                <div className="col-span-2  border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center text-gray-500">
                                        <h3 className="text-md font-bold text-gray-500">Tipos de Tareas</h3>
                                        <div className="grid grid-cols-2 gap-4 px-3">
                                            <div>
                                                <h3 className="text-md  capitalize text-gray-500">reading <span className="font-bold  text-red-400">{nFormatter(task.filter(e => e.type === "reading").length, 1)}
                                                </span> </h3>
                                                <h3 className="text-1xl capitalize ">writing <span className="font-bold text-yellow-500">{nFormatter(task.filter(e => e.type === "writing").length, 1)}
                                                </span> </h3>
                                            </div>
                                            <div>
                                                <h3 className="text-1xl capitalize ">vocabulary <span className="font-bold text-green-500">{nFormatter(task.filter(e => e.type === "vocabulary").length, 1)}
                                                </span> </h3>
                                                <h3 className="text-1xl capitalize ">grammar <span className="font-bold text-blue-500">{nFormatter(task.filter(e => e.type === "grammar").length, 1)}
                                                </span> </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center "></div>
                                <div className=" border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center "></div>
                                <div className="col-span-2  border  rounded-lg border-gray-200 h-24 grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center">

                                        <button type="button" onClick={graficando} id="graficaTipos" class="inline-block font-bold px-6 py-2 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Gráfica Tipos de Tareas</button>
                                    </div>
                                </div>
                            </div>
                            <div className=" py-10 pr-10  grid grid-cols-1 ">
                                <div className="border  rounded-lg border-gray-200">
                                    {grafica ? <div class="object-contain h-72 w-72 mx-auto py-2 ">{grafica} </div>
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
                    }
                </div>
            </div>
        </div>

    )
}

export default ReportingTask;