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
        compact: true
    },
    {
        name: 'Tipo',
        selector: row => row.type,
        sortable: true
    },

];
const UnitPage = (props) => {
    let { book_number, module_number, unit_number } = useParams();

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

        

        const questionResponse = await fetch(`${API_URL}review/${book_number}/${modulo}/${unit_number}/`, {
            method: "GET",
            /* headers: {
              token: API_KEY,
            }, */
        })
        const _question = await questionResponse.json();
        const _questionTable = _question.map((e) => {
            return {
                _id: e._id,
                question: e.question,
                type: e.type.replace(/^\w/, (c) => c.toUpperCase())
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
                 <h2 className="text-3xl font-bold">Preguntas</h2>
                <div className="text-left my-2">
                    <button key="new" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border border-green-500 rounded">
                        Agregar
                    </button>
                </div>
                <div className="container-fluid rounded overflow-hidden shadow-lg border-2 border-gray-200 p-4 bg-white">
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
                                dense
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