import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import {
    useParams
} from "react-router-dom";
import shortid from "shortid";
import { mostrarExitoEditar, mostrarAlertaEliminar } from '../../components/Alert/Alert'
import DataTable from 'react-data-table-component';

const API_URL = "http://localhost:5000/";
const USER = JSON.parse(localStorage.getItem("user"));
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";


const UnitPage = (props) => {
    let { book_number, module_number, unit_number } = useParams();

    var modulo = parseInt(module_number) === 1 ? (parseInt(book_number) * 2) - 1 : parseInt(book_number) * 2;

    const [cargando, setcargando] = useState(true);
    const [data, setData] = useState(null);
    const [typeTask, setTypeTask] = useState([]);


    const getQuestion = async () => {
        const taksresponse = await fetch(`${API_URL}task/view/${book_number}/${modulo}/${unit_number}/`, {
            method: "GET",
            /* headers: {
              token: API_KEY,
            }, */
        })
        const _task = await taksresponse.json();
        console.log(_task)
        setData(_task);
        //return _task;
        let types = _task.map(e => {
            return e.type
        })
        types = new Set(types);
        console.log(types)
        setTypeTask((typeTask) => [...typeTask, ...types])
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
        <div>
            <NavComponent data={USER} />
            <div className="m-5">
                <h3 className="text-2xl font-semibold text-center text-gray-700 uppercase my-3">Tareas de la unidad {unit_number} </h3>
                <div className="accordion" id="accordionExample">
                    {typeTask.length != 0 ? typeTask.map((e, i) => {
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
                                    className="accordion-collapse collapse show"
                                    aria-labelledby={`heading${i}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body py-4 px-5">
                                        <div className="flex flex-cols justify-center overflow-auto space-x-4 py-3">
                                            {
                                                data.map((e2, i2) => {
                                                    if (e2.type === e) {
                                                        return (
                                                            <div key={shortid.generate()} className="block p-6 rounded-lg shadow-lg bg-white overflow-hidden w-1/2">
                                                                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{e2.topic.top} <span className="text-xs inline-block py-1 px-2.5 leading-none capitalize text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">{e2.type}</span></h5>
                                                                <p className="text-gray-700 text-base mb-4">
                                                                    {e2.objetive.text}
                                                                </p>
                                                                <a href={`/dashboard/book/${book_number}/module/${modulo}/unit/${unit_number}/task/${e2._id}`} className="text-yellow-500 hover:text-yellow-600 transition duration-300 ease-in-out mb-4">Ve preguntas</a>

                                                            </div>
                                                        )
                                                    }
                                                })
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