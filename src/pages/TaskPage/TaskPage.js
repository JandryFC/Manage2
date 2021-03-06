import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import { useNavigate } from "react-router-dom"
import {
    useParams
} from "react-router-dom";
import { mostrarExitoEditar, mostrarAlertaEliminar, mostrarAlertaConfimacion } from '../../components/Alert/Alert'
import DataTable from 'react-data-table-component';
import { transformTypeQuestion } from "../../helpers/fuctions"

const USER = JSON.parse(localStorage.getItem("user"));

const columns = [
    {
        name: 'Nº',
        selector: row => row.id,
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

    let modulo_n = module_number%2 !== 0 ? parseInt(1) : parseInt(2) 

    var modulo = parseInt(module_number) === 1 ? (parseInt(book_number) * 2) - 1 : parseInt(book_number) * 2;

    const [cargando, setcargando] = useState(true);
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [data, setData] = useState([]);
    const [longitud, setLongitud] = useState(0);
    const [longitud2, setLongitud2] = useState();
    var navigate = useNavigate()
    
    const atras = () => {
        navigate(-1)
    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);
    

    const contextActions = React.useMemo(() => {

        const handleUpdate = async () => {
            window.location = `/books/editQuestion/${selectedRows[0]._id}`
        }
        const handleDelete = async () => {

            const alerta = await mostrarAlertaEliminar("Pregunta");
            if ((await alerta).value) {
                setToggleCleared(!toggleCleared);
                let delete_response = null;
                try {
                    delete_response = await fetch(`${process.env.REACT_APP_API_URL}question/delete/${selectedRows[0]._id}/`, {
                        method: "GET",
                        headers: {
                            token: process.env.REACT_APP_SECRET_TOKEN,
                        },
                    });

                } catch (e) {
                    mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
                    return;
                }
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
            <div className="flex md:space-x-4">
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

        try {
            const questionResponse = await fetch(`${process.env.REACT_APP_API_URL}question/view/${book_number}/${modulo}/${unit_number}/${task_number}`, {
                method: "GET",
                headers: {
                    token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })
            const _question = await questionResponse.json();
            let number = 0
            const _questionTable = _question.map((e) => {
                number = number + 1
                return {
                    _id: e._id,
                    id:number,
                    question: e.question,
                    type: transformTypeQuestion(e.type),
                }
            })
            setcargando(false);
            setData(await _questionTable);
            
        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setcargando(false);
            return;
        }


    }
    const deleteAll = async () => {
        let result = mostrarAlertaConfimacion("Eliminar Tarea", "warning", "¿Está seguro de eliminar esta tarea?")
        if ((await result).value) {
            setcargando(true);

            let responseAll = null;
            try {
                responseAll = await fetch(`${process.env.REACT_APP_API_URL}task/delete/${task_number}`, {
                    method: "GET",
                    headers: {
                        token: process.env.REACT_APP_SECRET_TOKEN,
                    },
                })
                const _task = await responseAll.json();
                setcargando(false);
                if (_task.msg === "CORRECT") {
                    window.location = `/books/book/${book_number}/module/${modulo}/unit/${unit_number}`
                } else {
                    const e = new Error("No se pudo eliminar")
                }
            } catch (e) {
                mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
                setcargando(false);
                return;
            }
        }

    }

    

    useEffect(async () => {
        getQuestion()
        //setLongitud( data.length)
    }, []);

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        }
        setLongitud2( data.length)
        if(longitud !== longitud2 ){
            getQuestion()
            setLongitud( data.length)

        }

    });

    return (
        <div>
            <NavComponent data={USER} />
            <div className="md:flex">
                <div>
                    {//<NavLateral  data={USER} />
                    }
                </div>
                <div className=" p-5 mx-auto xl:w-4/5">
                    <div className="md:flex mx-auto justify-between p-4">
                        <div className="">
                            <div className="dropdown relative  ">
                                <button
                                    className=" dropdown-toggle px-4 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
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
                                            href={`/books/newQuestion/${task_number}/completar_texto`}
                                        >Completar texto</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href={`/books/newQuestion/${task_number}/emparejar_img`}
                                        >Emparejar imagenes</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href={`/books/newQuestion/${task_number}/opcion_correcta_1`}
                                        >Opción correcta</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href={`/books/newQuestion/${task_number}/opcion_correcta_n`}
                                        >Opción correcta multiple</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href={`/books/newQuestion/${task_number}/true_false`}
                                        >Verdadero y falso</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href={`/books/newQuestion/${task_number}/emparejar`}
                                        >Emparejar texto</a
                                        >
                                    </li>
                                    {/* <li>
                                        <a
                                            className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                            href={`/dashboard/newQuestion/${task_number}/ordenar`}
                                        >Ordenar</a
                                        >
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="px-2">
                            <h3 className="uppercase tracking-wider md:text-xl md:text text-center font-bold">Preguntas de la Unidad {unit_number} | Módulo {modulo_n} | Libro {book_number}</h3>
                        </div>
                        <div className=" text-right">
                            {cargando ? <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500 " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : <div> <button onClick={deleteAll} type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Eliminar todo</button></div>}

                        </div>
                    </div>
                    <div>
                        {!cargando && /*console.log(userProgress)  */
                            <div className="shadow-md">
                                <div className=" ">
                                    <DataTable
                                        title="Lista de Preguntas"
                                        columns={columns}
                                        data={data}
                                        fixedHeader={true}
                                        fixedHeaderScrollHeight="350px"
                                        pagination
                                        selectableRows
                                        noDataComponent={<span className="p-10">No se encontró ningún elemento, por favor debe registrar al menos una pregunta</span>}
                                        contextActions={contextActions}
                                        selectableRowsSingle={true}
                                        onSelectedRowsChange={handleRowSelected}
                                        clearSelectedRows={toggleCleared}
                                    />
                                </div>
                            </div>
                            

                        }
                    </div>
                    <div className="py-5">
                    <button onClick={atras}
                         className=" dropdown-toggle px-4 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                >          
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
                        </svg>
                        REGRESAR
                    </button>
                    </div>
            </div>
            </div>
            
            
        </div>
    )
}

export default UnitPage;