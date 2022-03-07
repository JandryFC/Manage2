import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'
import { transformTypeQuestion } from '../../helpers/fuctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";



const Completar_texto = (props) => {

    const [question, setQuestion] = useState(props.question);
    var formData = new FormData()
    var navigate = useNavigate()
    const [items, setItems] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [enviar, setEnviar] = useState(false);



    const handleChange = async (e) => {
        const aux_question = question;
        const name = e.target.name
        const value = e.target.value;

        if (name === "question") {
            aux_question.question = value
        } if (name === "img") {
            formData.set("files", e.target.files[0])
        }
        if (name.substr(0, 4) === "item") {
            let index = parseInt(name.substr(-1))
            aux_question.body[index].item[0] = value
        }
        if (e.target.name.substr(0, 6) === "answer") {
            let index = parseInt(name.substr(-1))
            aux_question.body[index].answer = value
        }
        setQuestion(aux_question)
        formData.set("question", JSON.stringify(question))
    };

    const handleForm = async (form) => {
        formData.set("files", form.imagen[0]);
        setEnviar(true);
        let data_upload = null;
        try {
            data_upload = await fetch(`${API_URL}question/new`,
                {
                    method: "POST",
                    body: formData,
                    /*headers: {
                         token: API_KEY, 
                        "Content-type": "multipart/form-data",
                    },*/
                }
            )
        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setEnviar(false);
            return;
        }

        var upload = await data_upload.json()
        setEnviar(false);
        if (upload.msg === "CORRECT") {
            var result = mostrarExitoEditar("Exito", "La pregunta fue almanceda correctamente", "success")
            if (await result) {
                navigate(-1)
            }

        } else {
            mostrarExitoEditar("Error", "Hubo un problema al agregar la pregunta", "error")
        }
    }

    const removeItem = (e) => {
        let index = parseInt(e.target.id.substr(-1))
        let _items = items
        let _questions = question;
        _items.splice(index - 1, 1);
        _questions.body.splice(index - 1, 1);
        setItems((items) => [..._items])
        setQuestion(_questions)
    }
    const AgregarOpciones = () => {
        let items_new = { item: ["", "________"], answer: "" }
        let aux_question = question;
        setItems((items) => [...items, items_new])
        aux_question.body.push(items_new);
        setQuestion(aux_question);
    }

    return (
        <div className="w-full max-w-xl m-auto py-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleForm)}>
                <div className="mb-4">
                    <h2 className="block text-center text-yellow-500 text-2xl font-bold mb-2">
                        Crear pregunta:
                    </h2>
                </div>
                <div className="mb-4">
                    <h2 className="block text-gray-700 text-md font-bold mb-2">
                        Tipo pregunta: <span className="text-md  font-normal">{transformTypeQuestion(question.type)}</span>
                    </h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="question">
                        Pregunta:
                    </label>
                    <textarea {...register("question", { required: true })} id="question" name="question" onChange={handleChange} rows="4" className=" shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.question}>
                    </textarea>
                    {errors.question &&
                        (
                            <h2 className="text-red-500 text-md">Campo requerido</h2>
                        )
                    }
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="imagen">
                        Imagen:
                    </label>
                    <input {...register("imagen")} onChange={handleChange} name="imagen" accept="image/*" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="imagen"></input>

                </div>
                <div className="mb-4">
                    <div className="flex space-x-2 justify-center">
                        <div>

                            <button type="button" onClick={AgregarOpciones} className="inline-block rounded-full bg-green-600 text-white leading-normal uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>

                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                        Respuestas:{/*  {question.options.length}  */}
                    </label>


                    <div className="overflow-auto h-52">
                        {items ? items.map((e, i) => {
                            return (
                                <div className="flex flex-cols-2 mx-3 mb-6" key={shortid.generate()}>
                                    <div className="w-9/12 mx-3">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`respuesta${i + 1}`}>
                                            Item {i + 1}
                                        </label>
                                        <input {...register(`item${i}`, { required: true })} name={`item${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.body[i].item[0]} id={`respuesta${i + 1}`} type="text" placeholder="Item"></input>
                                        {errors[`item${i}`] &&
                                            (
                                                <h2 className="text-red-500 text-md">Campo requerido</h2>
                                            )
                                        }
                                    </div>
                                    <div className="w-9/12 mx-3">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`respuesta${i + 1}`}>
                                            Respuesta {i + 1}
                                        </label>
                                        <input {...register(`answer${i}`, { required: true })} name={`answer${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.body[i].answer} id={`answer${i + 1}`} type="text" placeholder="Respuesta"></input>
                                        {errors[`answer${i}`] &&
                                            (
                                                <h2 className="text-red-500 text-md">Campo requerido</h2>
                                            )
                                        }
                                    </div>
                                    <div className="w-3/12 pt-1 mx-3 ">
                                        <br></br>
                                        <button onClick={removeItem} id={`itemRemove${i + 1}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                            <FontAwesomeIcon icon={faTrashAlt} />

                                        </button>
                                    </div>

                                </div>
                            );
                        }) : <div>No existen items </div>}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-green-500 hover:bg-greeb-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Actualizar
                    </button>
                    {enviar && (
                        <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-500" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}

                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )

}

export default Completar_texto;