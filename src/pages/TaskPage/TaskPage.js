import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import {
    useParams
} from "react-router-dom";
import shortid from "shortid";
import { mostrarExitoEditar, mostrarAlertaEliminar } from '../../components/Alert/Alert'
import DataTable from 'react-data-table-component';
import { transformTypeQuestion } from "../../helpers/fuctions"

const API_URL = "http://localhost:5000/";
const USER = JSON.parse(localStorage.getItem("user"));
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";

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
        name: 'Preguntas',
        selector: row => row.question,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "70vh"

    },

    {
        name: 'Tipo',
        selector: row => row.type,
        sortable: true
    },

];
const UnitPage = (props) => {
    let { book_number, module_number, unit_number, task_number } = useParams();

    var modulo = parseInt(module_number) === 1 ? (parseInt(book_number) * 2) - 1 : parseInt(book_number) * 2;

    const [cargando, setcargando] = useState(true);
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [data, setData] = useState([]);

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {

        const handleUpdate = async () => {
            window.location = `/dashboard/editQuestion/${selectedRows[0]._id}`
        }
        const handleDelete = async () => {

            const alerta = await mostrarAlertaEliminar("Pregunta");
            if (await alerta) {
                setToggleCleared(!toggleCleared);
                const delete_response = await fetch(`${API_URL}question/delete/${selectedRows[0]._id}/`, {
                    method: "GET",
                    /* headers: {
              token: API_KEY,
            }, */
                });
                const _delete = await delete_response.json();
                if (_delete.message) {
                    //se eliminó de la base de datos 
                    var result = await mostrarExitoEditar("Exito", "La pregunta fue eliminada correctamente", "success")
                    await getQuestion();
                } else {
                    //hubo un error al eliminar el dato
                    var result = mostrarExitoEditar("Error", "Hubo un problema al eliminar la pregunta", "error")
                }
            }
        };

        return (
            <div className="space-x-4">
                <button key="edit" onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border border-yellow-500 rounded">
                    Editar
                </button>
                <button key="delete" onClick={handleDelete} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border border-red-500 rounded">
                    Eliminar
                </button>
            </div>
        );
    }, [data, selectedRows, toggleCleared]);

    const getQuestion = async () => {



        const questionResponse = await fetch(`${API_URL}question/view/${book_number}/${modulo}/${unit_number}/${task_number}`, {
            method: "GET",
            /* headers: {
              token: API_KEY,
            }, */
        })
        const _question = await questionResponse.json();
        console.log(_question)
        const _questionTable = _question.map((e) => {
            return {
                _id: e._id,
                question: e.question,
                type: transformTypeQuestion(e.type),
            }
        })
        setcargando(false);
        setData(await _questionTable);
    }

    useEffect(async () => {
        getQuestion()
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
                <h3 className="text-2xl font-semibold text-center text-gray-700 uppercase  my-3">Preguntas de la tarea  </h3>
                <div className="container-fluid rounded overflow-hidden w-1/2 m-auto shadow-lg border-2 border-gray-200 p-4 bg-white">
                    <div className=" my-2 ">
                        <div className="dropdown relative">
                            <button
                                className=" dropdown-toggle px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                type="button"
                                id="dropdownMenuButton5"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Agregar pregunta
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
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/completar_texto`}
                                    >Completar texto</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/emparejar_img`}
                                    >Emparejar imagenes</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/opcion_correcta_1`}
                                    >Opción correcta</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/opcion_correcta_n`}
                                    >Opción correcta mmultiple</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/true_false`}
                                    >Veradero y falso</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/emparejar`}
                                    >Emparejar texto</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                        href={`/dashboard/newQuestion/${task_number}/ordenar`}
                                    >Ordenar</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    {!cargando ? /*console.log(userProgress)  */
                        <div className="">

                            <DataTable
                                title="Lista de preguntas"
                                columns={columns}
                                data={data}
                                fixedHeader={true}
                                fixedHeaderScrollHeight="350px"
                                pagination
                                selectableRows

                                contextActions={contextActions}
                                selectableRowsSingle={true}
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                            />
                        </div>
                        : <div>CARGANDO...</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UnitPage;