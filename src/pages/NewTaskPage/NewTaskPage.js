import React, { useState } from 'react'
import NavComponent from "../../components/NavComponent/NavComponent";

import {
    useParams
} from "react-router-dom";
import { mostrarExitoEditar } from '../../components/Alert/Alert'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

const USER = JSON.parse(localStorage.getItem("user"));

const NewTaskPage = () => {

    let { unit_number, type, book_number, module_number, } = useParams();
    var formData = new FormData();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [task, setTask] = useState({})
    const [enviar, setEnviar] = useState(false)

    var navigate = useNavigate()
    
    const atras = () => {
        navigate(-1)
    }


    const handleChange = (e) => {
        let name = e.target.name;
        let value = name !== "file_upload" ? e.target.value : e.target.files;

        setTask({
            ...task,
            [name]: value,
        });
    }
    const handleForm = async () => {
        setEnviar(true);
        let unit_id = 1
        const modulo = window.location.href.split('/')[window.location.href.split('/').length - 5];
        const unidad = window.location.href.split('/')[window.location.href.split('/').length - 3];

        if(unidad === '1'){
            unit_id=(modulo*2)-1
        }else{
            unit_id=(modulo*2)
        }
        

        
        formData.set("task", JSON.stringify({ ...task, id_unidad: unit_id, type_task: type }))
        formData.set("files", Object.keys(task).find(x => x === "file_upload") ? task.file_upload[0] : null);
        let responseTask = null
        try {
            responseTask = await fetch(`${process.env.REACT_APP_API_URL}task/create`, {
                method: "POST",
                body: formData,
                headers: {
                  token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setEnviar(false);
            return;
        }
        let _task = await responseTask.json()

        if (_task.msg === "CORRECT") {
            await mostrarExitoEditar("Exito", "Tarea agregada correctamente", "success")
        } else {
            await mostrarExitoEditar("Error", "No se pudo agregar la tarea", "error")
        }
        window.location = `/books/book/${book_number}/module/${module_number}/unit/${unit_number}`
    }
    return (
        <div className="">
            <NavComponent data={USER} />

            <div className="pt-2 p-2 text-center items-justify-center justify-center mx-auto ">
                <button onClick={atras}
                         className=" dropdown-toggle px-4 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                >          
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
                        </svg>
                        REGRESAR
                 </button>
            </div>
            <div className="p-4">
            
                <div className=''>
                    <div className="w-full  max-w-2xl m-auto pb-5">
                        <form className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleForm)}>
                            <div className="mb-4">
                                <h2 className=" uppercase block text-center text-yellow-500 text-xl font-bold mb-2">
                                    Crear Tarea
                                </h2>
                            </div>
                            <div className='overflow-y-auto h-95'>
                                <div className="mb-4">
                                    <h2 className="block text-gray-700 text-md font-bold mb-2">
                                        Tipo de tarea: <span className="text-md capitalize  font-normal">{type}</span>
                                    </h2>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="question">
                                        Topic:
                                    </label>
                                    <input {...register("topic", { required: true })} id="topic" name="topic" onChange={handleChange} className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue={task.topic} />
                                    {errors.topic &&
                                        (
                                            <h2 className="text-red-500 text-md">Campo requerido</h2>
                                        )
                                    }
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="objective">
                                        Objective:
                                    </label>
                                    <textarea {...register("objective", { required: true })} id="objective" name="objective" onChange={handleChange} rows="3" className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-900 focus:outline-none" defaultValue={task.objective}>
                                    </textarea>
                                    {errors.objective &&
                                        (
                                            <h2 className="text-red-500 text-md">Campo requerido</h2>
                                        )
                                    }
                                </div>
                                <div className='mb-4'>
                                    <div>
                                        <label className="block text-md font-bold text-gray-700"> Imagenes: </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file_upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input {...register("fileupload")} onChange={handleChange} id="file_upload" accept="image/*" name="file_upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                                {task.file_upload &&
                                                    (
                                                        <p className="text-xs text-gray-500">
                                                            Seleccionado {task.file_upload.length} archivos
                                                        </p>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="explanation">
                                        Explanation:
                                    </label>
                                    <textarea {...register("explanation")} id="explanation" name="explanation" onChange={handleChange} rows="3" className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-900 focus:outline-none" defaultValue={task.explanation}>
                                    </textarea>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button className="bg-green-500 hover:bg-greeb-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Guardar
                                    </button>
                                    {enviar && (
                                        <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-500" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2020 Acme Corp. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTaskPage;