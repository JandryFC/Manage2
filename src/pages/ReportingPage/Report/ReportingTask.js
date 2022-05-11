
import React, { useState } from "react";
import { mostrarExitoEditar } from '../../../components/Alert/Alert'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nFormatter } from '../../../helpers/fuctions'
import image_cargando from '../../../assets/undraw_charts_re_5qe9.svg'
import image_charts from '../../../assets/undraw_growing_re_olpi.svg'
import { llenarInfo, agregarLibro } from '../../../helpers/fuctions'


import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const ReportingTask = () => {
    const [book, setBook] = useState([]);
    const [task, setTask] = useState([]);
    const [question, setQuestion] = useState([]);
    const [progress, setProgress] = useState([]);


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [checked, setChecked] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [grafica, setGrafica] = useState(null);
    const [openTab2, setOpenTab2] = React.useState(0);

    var formData = new FormData();
    formData.set("mode", "NO_DATE");


    const getTask = async () => {
        setCargando(true)
        let responseTask = null;
        let responseProgress = null;
        let responseQuestion = null;
        let responseBook = null;
        formData.set("endDate", endDate)
        formData.set("startDate", startDate)
        formData.set("mode", checked ? "DATA" : "NO_DATE");
        try {
            responseTask = await fetch(`${process.env.REACT_APP_API_URL}task/task/date`, {
                method: "GET",
                headers: {
                  token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })

            responseProgress = await fetch(`${process.env.REACT_APP_API_URL}user/date`, {
                method: "POST",
                body: formData,
                headers: {
                  token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })

            responseQuestion = await fetch(`${process.env.REACT_APP_API_URL}evaluation/`, {
                method: 'GET',
                //body: formData,
                headers: {
                    'token':process.env.REACT_APP_SECRET_TOKEN,
                  },
            });
            responseBook = await fetch(`${process.env.REACT_APP_API_URL}book/`, {
                method: "GET",
                headers: {
                  token: process.env.REACT_APP_SECRET_TOKEN,
                },
              });
              

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor, vuelva a intentarlo", "error")
            setCargando(false);
            return;
        }
        
        let _task = await responseTask.json()

        let _userProgress = await responseProgress.json();
        let _question = await responseQuestion.json();
        let _book = await responseBook.json();

        if (_task.data.length == 0 || _userProgress.data.length == 0 || (_book.res.length/4) == 0) {
            mostrarExitoEditar("Atención", "No existen datos a mostrar", "warning")
        } else {
            setProgress(_userProgress.data.map(e => { return { name: `${e.name} ${e.lastname}`, progress: e.progress } }))
            setTask(_task.data)
            setQuestion(_question)
            setBook(_book.res)
        }
        setCargando(false);
    }

    const getData = async(idlibro) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}evaluation/`, {
            method: 'GET',
            headers: {
                'token':process.env.REACT_APP_SECRET_TOKEN,
              },
        });
        const data = await response.json();
        
        return data;
    }

    React.useEffect(() => {
      
      // getTask();
      //console.log(question)
         
    }, [])

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setChecked(value);

    }

    const generarReporte = () => {
        
        getTask();
    }


    const graficando = (e) => {
        let id = e
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
                                    text: "Tipos de Actividades",
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
            case "graficaPreguntas":
                    setGrafica(<Pie
                        options={
                            {
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Tipos de Preguntas",
                                        fontSize: 25,
                                    },
                                    legend: {
                                        display: true,
                                        position: "bottom"
                                    }
                                }
                            }
                        } data={{
                            labels: ['Opción Única', 'Opción Múltiple', 'Verdadero o Falso','Emparejar', 'Ordenar','Completar'],
                            datasets: [
                                {
                                    label: 'Tipos de Preguntas',
                                    data: [
                                        question.filter(e => e.type === "opcion_correcta_1").length,
                                        question.filter(e => e.type === "opcion_correcta_n").length,
                                        question.filter(e => e.type === "true_false").length,
                                        question.filter(e => e.type === "emparejar").length + task.filter(e => e.type === "emparejar_img").length,
                                        question.filter(e => e.type === "ordenar").length,
                                        question.filter(e => e.type === "completar_texto").length
                                    ],
                                    backgroundColor: [
                                        'rgba(50,  205, 50, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(128, 0,  128, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(50,  205, 50, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(255, 159, 64, 1)',
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(128, 0,  128, 1)'
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
        <div className="flex flex-col items-center">
            <div className=" md:flex items-center  px-10">
                <div className="px-3 py-2">
                    <div className="flex justify-center">
                        <div>
                            <div className="form-check">
                                <input onChange={handleChange} defaultChecked className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
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
                <div className="shadow-lg bg-white rounded-lg  overflow-hidden">
                    {task.length == 0 ?
                        <div className="p-10 grid grid-cols-1 gap-4 content-center" id="chartBar">
                            <div className="mx-auto">
                                <img src={image_cargando} width="375" />
                                <h3 className="text-xl  text-center text-gray-600 my-4">Seleccione la información</h3>
                            </div>
                        </div>
                        : <div className=" bg-gray-100  pb-5 md:p-10  gap-2">
                            <div className="p-5 grid col-span-2 grid-cols-3 gap-4 " id="chartBar">
                            <div className="  shadow-lg bg-white rounded border-gray-200   grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center">
                                        <h3 className="text-2xl uppercase text-yellow-500">{(book.length) / 4} </h3>
                                        <h3 className="font-bold uppercase text-sm text-gray-500">Libros</h3>
                                    </div>
                                </div>
                                <div className="  shadow-lg bg-white rounded border-gray-200   grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center">
                                        <h3 className="text-2xl uppercase text-yellow-500">{nFormatter(task.length, 1)}{(book.length) / 4} </h3>
                                        <h3 className="font-bold uppercase text-sm text-gray-500">Tareas</h3>
                                    </div>
                                </div>
                                <div className="   h-28 shadow-lg bg-white rounded border-gray-200  grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center">
                                        <h3 className="text-2xl uppercase text-yellow-500">{question.length} </h3>
                                        <h3 className="font-bold uppercase text-sm text-gray-500">Preguntas</h3>
                                    </div>
                                </div>
                                
                                <div className="md:col-span-2 col-span-3  shadow-lg bg-white rounded border-gray-200 py-2 grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center py-2 text-gray-500">
                                        <h3 className="text-md font-bold text-gray-500">Tipos de Actividades</h3>
                                        <div className="grid grid-cols-2  px-3">
                                            <div>
                                                <div className="text-sm  capitalize text-gray-500">reading <h3 className="font-bold  text-red-400">{nFormatter(task.filter(e => e.type === "reading").length, 1)}
                                                </h3> </div>
                                                <div className="text-sm capitalize ">writing <h3 className="font-bold text-yellow-500">{nFormatter(task.filter(e => e.type === "writing").length, 1)}
                                                </h3> </div>
                                            </div>
                                            <div>
                                                <div className="text-sm capitalize ">vocabulary <h3 className="font-bold text-green-500">{nFormatter(task.filter(e => e.type === "vocabulary").length, 1)}
                                                </h3> </div>
                                                <div className="text-sm capitalize ">grammar <h3 className="font-bold text-blue-500">{nFormatter(task.filter(e => e.type === "grammar").length, 1)}
                                                </h3> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="  hidden md:block  bg-white rounded bg-white border-gray-200 grid grid-cols-1 gap-4 content-center ">

                                </div>
                                <div className="md:col-span-2 col-span-3 w-full  py-2 shadow-lg bg-white  rounded border-gray-200  grid grid-cols-1 gap-4 content-center ">
                                    <div className="text-center text-gray-500 py-2">
                                        <h3 className="text-md font-bold text-gray-500">Tipos de Preguntas</h3>
                                        <div className="grid grid-cols-3 gap-5 px-3">
                                            <div>
                                                <h2 className="text-sm capitalize ">opción única <h1 className="font-bold text-green-500">{(question.filter(e => e.type === "opcion_correcta_1").length)}
                                                </h1> </h2>
                                                
                                                <h2 className="md:hidden text-sm capitalize ">... <h1 className="font-bold text-green-500">
                                                </h1> </h2>
                                                
                                                <h2 className="text-sm capitalize ">emparejar <h1 className="font-bold text-yellow-500">{question.filter(e => e.type === "emparejar").length + question.filter(e => e.type === "emparejar_img").length }
                                                </h1> </h2>
                                            </div>
                                            <div className="">
                                                 <h2 className="text-sm  capitalize text-gray-500">opción múltiple <h1 className="font-bold  text-blue-400">{(question.filter(e => e.type === "opcion_correcta_n").length)}
                                                </h1> </h2>

                                                <h2 className=" text-sm capitalize ">completar <h1 className="font-bold text-purple-500">{(question.filter(e => e.type === "completar_texto").length)}
                                                </h1> </h2>
                                            </div>
                                            <div>
                                                <h2 className="text-sm capitalize ">verdadero-falso <h1 className="font-bold text-yellow-500">{(question.filter(e => e.type === "true_false").length)}
                                                </h1> </h2>
                                                <h2 className="text-sm capitalize ">ordenar <h1 className="font-bold text-red-500">{(question.filter(e => e.type === "ordenar").length)}
                                                </h1> </h2>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="  hidden md:block   rounded  bg-white border-gray-200 grid grid-cols-1 gap-4 content-center ">

                                </div>

                            </div>
                            <div className="px-5 bg-gray-100 static ">
                                <div className="border bg-white py-5  pb-12 rounded-lg border-gray-200">
                                <ul
                                    className="flex px-10"
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
                                            graficando('graficaTipos');
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                        >
                                        <i className="fas fa-space-shuttle text-base mr-1"></i> ACTIVIDADES
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
                                            graficando('graficaPreguntas');
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                        >
                                        <i className="fas fa-cog text-base mr-1"></i>  PREGUNTAS
                                        </a>
                                    </li>
                                    </ul>
                                    {grafica ? <div  className="object-contain h-80 w-80 mx-auto py-2 ">{grafica} </div>
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