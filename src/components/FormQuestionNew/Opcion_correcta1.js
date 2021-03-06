import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'
import { transformTypeQuestion } from '../../helpers/fuctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
/* import {
    useParams
} from "react-router-dom";
 */

const Opcion_correcta1 = (props) => {

    const [question, setQuestion] = useState(props.question);
    var formData = new FormData()
    var navigate = useNavigate()
    
    /* const [disableForm, setDisableForm] = useState(true) */
    const [items, setItems] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [enviar, setEnviar] = useState(false);

    const handleChange = async (e) => {
        const aux_question = question;
        const value = e.target.value;

        if (e.target.name === "question") {
            aux_question.question = value

        } if (e.target.name === "imagen") {
            formData.set("files", e.target.files[0])
        } if (e.target.name === "answer") {

            aux_question.options.forEach((e, i) => {
                aux_question.options[i].answer = false;
            })
            aux_question.options[value].answer = true;
        }

        if (e.target.name.substr(0, 4) === "item") {
            let index = parseInt(e.target.name.substr(-1))
            aux_question.options[index].item = e.target.value
        }
        //formData.set("question", JSON.stringify(aux_question))
        setQuestion(aux_question)
    };

    const handleForm = async (form) => {
        formData.set("question", JSON.stringify(question))
        formData.set("files", form.imagen[0]);
        setEnviar(true);
        let data_upload = null;
        try {

            data_upload = await fetch(`${process.env.REACT_APP_API_URL}question/new`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        token: process.env.REACT_APP_SECRET_TOKEN
                    },
                }
            )

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontr?? conexi??n con el servidor", "error")
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
            //mostrarExitoEditar("Error", "Hubo un problema al agregar la pregunta", "error")
            console.log('no hubo futuro')
        }
    }

    const removeItem = (e) => {
        console.log(e.target.id)
        let index = parseInt(e.target.id.substr(-1))
        let _items = items
        let _questions = question;
        _items.splice(index - 1, 1);
        _questions.options.splice(index - 1, 1);
        setItems((items) => [..._items])
        setQuestion(_questions)
    }
    const AgregarOpciones = () => {
        let items_new = { item: "", answer: false }
        let aux_question = question;
        setItems((items) => [...items, items_new])
        aux_question.options.push(items_new);
        setQuestion(aux_question);
    }

    return (
        <div className="">
            <div className=''>
                <div className="w-full max-w-xl m-auto py-5">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleForm)}>
                        <div className="mb-4">
                            <h2 className="block text-center uppercase text-yellow-500 text-2xl font-bold mb-2">
                                Crear pregunta
                            </h2>
                        </div>
                        <div className='overflow-y-auto h-95'>
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
                                

                                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                                    Respuestas:{/*  {question.options.length}  */}
                                </label>
                                <div className="flex space-x-2 justify-center">
                                    <div>

                                        <button type="button" onClick={AgregarOpciones} className="inline-block rounded-full bg-green-600 text-white leading-normal uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-auto h-52">
                                    {items ? items.map((e, i) => {
                                        return (
                                            <div className="flex flex-cols-2 mx-3 mb-6" key={shortid.generate()}>
                                                <div className="w-9/12 mx-3">
                                                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`respuesta${i + 1}`}>
                                                        Respuesta {i + 1}
                                                    </label>
                                                    <input {...register(`item${i}`, { required: true })} name={`item${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.options[i].item} id={`respuesta${i + 1}`} type="text" placeholder="Respuesta"></input>
                                                    {errors[`item${i}`] &&
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
                                <div className="inline-block relative w-64">
                                    <label htmlFor="respuesta_correcta" className="block text-gray-700 text-md font-bold mb-2">Respuesta correcta: </label>
                                    <select id="respuesta_correcta" {...register("answer", { required: true })} required name="answer" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                        <option defaultValue={""} selected disabled hidden>Choose here</option>
                                        {items ? items.map((e, i) => {
                                            return (<option value={i} key={shortid.generate()}>{`Respuesta ${i + 1}`}</option>)
                                        }) : <option>Sin opciones</option>
                                        }
                                    </select>
                                    {errors.answer &&
                                        (
                                            <h2 className="text-red-500 text-md">Campo requerido</h2>
                                        )
                                    }
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
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
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;Universidad T??nica de Manab??.
                    </p>
                </div>
            </div>
        </div>
    )


}
export default Opcion_correcta1;