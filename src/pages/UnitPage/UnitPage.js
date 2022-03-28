import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import {
    useParams
} from "react-router-dom";
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'

const USER = JSON.parse(localStorage.getItem("user"));


const UnitPage = (props) => {
    let { book_number, module_number, unit_number } = useParams();

    //var modulo = parseInt(module_number) === 1 ? (parseInt(book_number) * 2) - 1 : parseInt(book_number) * 2;

    const [cargando, setcargando] = useState(true);
    const [data, setData] = useState(null);
    const [typeTask, setTypeTask] = useState([]);
    const [idUnit, setIdUnit] = useState("");

    const getQuestion = async () => {
        let taksresponse = null, _unitresponse = null
        try {
            taksresponse = await fetch(`${process.env.REACT_APP_API_URL}task/view/${book_number}/${module_number}/${unit_number}/`, {
                method: "GET",
                /* headers: {
                  token: API_KEY,
                }, */
            })
            /*  let types = _task.map(e => {
                return e.type
            })
            types = new Set(types);*/
            const _task = await taksresponse.json();
            setData(_task.task);
            setIdUnit(_task.id_unit)
        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            return;
        }

        setTypeTask((typeTask) => [...typeTask, ...["writing", "vocabulary", "reading", "grammar"]])
        console.log(typeTask)
    }
    useEffect(async () => {
        getQuestion();
        setcargando(false);
    }, []);

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        }
    });

    return (
        <div className="">
            <NavComponent data={USER} />
            <div className="grid grid-col-2 ml-60">
                <div className="flex justify-between p-4">
                    <div>
                        <div className="dropdown relative">
                            <button
                                className=" dropdown-toggle px-4 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                type="button"
                                id="dropdownMenuButton5"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Crear Tarea
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
                                {typeTask.length && typeTask.map((e, i) => {
                                    return (
                                        <li key={shortid.generate()}>
                                            <a
                                                href={`/dashboard/book/${book_number}/module/${module_number}/unit/${unit_number}/newTask/${e}`} className="capitalize dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            > {e}</a>
                                        </li>
                                    )
                                }

                                )}


                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="uppercase  tracking-wider text-xl font-bold">Libro {book_number} Módulo {module_number} Unidad {unit_number} </h3>
                    </div>
                    <div></div>
                </div>

                <div className="accordion h-full overflow-y-auto" id="accordionExample">
                    {typeTask ? typeTask.map((e, i) => {
                        return (
                            <div className="accordion-item bg-white border border-gray-200" key={shortid.generate()}>
                                <h2 className="accordion-header  mb-0" id={`heading${i}`}>
                                    <button
                                        className=" capitalize accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${i}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${i}`}
                                    >
                                        {e}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${i}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${i}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body py-4 px-5">
                                        <div className="flex flex-cols justify-center overflow-auto space-x-4 py-3">
                                            {
                                                data.length != 0 ? data.map((e2, i2) => {
                                                    if (e2.type === e) {
                                                        return (
                                                            <div key={shortid.generate()} className="block p-6 rounded-lg shadow-lg bg-white overflow-hidden w-1/2">
                                                                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{e2.topic.top} <span className="text-xs inline-block py-1 px-2.5 leading-none capitalize text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">{e2.type}</span></h5>
                                                                <p className="text-gray-700 text-base mb-4">
                                                                    {e2.objetive.text}
                                                                </p>
                                                                <a href={`/dashboard/book/${book_number}/module/${module_number}/unit/${unit_number}/task/${e2._id}`} className="text-yellow-500 hover:text-yellow-600 transition duration-300 ease-in-out mb-4">Ve preguntas</a>

                                                            </div>
                                                        )
                                                    }
                                                }) : <div> <h3>No existen tareas</h3> </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                        :
                        <div>cargando</div>
                    }

                </div>

            </div>
        </div>
    )
}

export default UnitPage;