import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'


const Emparejar_img = (props) => {
    const [question, setQuestion] = useState({});
    var formData = new FormData()
    var navigate = useNavigate()


    useEffect(async () => {
        setQuestion(props.question)
        console.log(question)
        formData.set("question", JSON.stringify(question))
    })

    const handleChange = (e) => {
        const aux_question = question;
        const name = e.target.name
        const value = e.target.value;

        if (name === "question") {
            aux_question.question = value

        }
        if (name.substr(0, 6) === "opcion") {
            let index = parseInt(name.substr(-1))
            aux_question.opcion[index] = value
        }
        if (name.substr(0, 3) === "img") {
            let index = parseInt(name.substr(-1))
            formData.set(`img_answer${index}`, e.target.files[0])
            //aux_question.body[index].item[0] = value
        }
        if (e.target.name.substr(0, 6) === "answer") {
            let index = parseInt(name.substr(-1))
            aux_question.body[index].answer = value

        }
        setQuestion(aux_question)
        formData.set("question", JSON.stringify(question))
    }
    const handleForm = async (e) => {
        e.preventDefault();
        const data_upload = await fetch(`${process.env.REACT_APP_API_URL}editQuestion`,
            {
                method: "PUT",
                body: formData,
                /*headers: {
                     token: API_KEY, 
                    "Content-type": "multipart/form-data",
                },*/
            }
        )
        var upload = await data_upload.json()
        if (upload.msg === "CORRECT") {
            var result = mostrarExitoEditar("Exito", "La pregunta fue almanceda correctamente", "success")
            if (await result) {
                navigate(-1)
            }

        } else {
            mostrarExitoEditar("Error", "Hubo un problema al agregar la pregunta", "error")
        }

    }
    return (
        <div className="w-full max-w-2xl m-auto py-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <h2 className="block text-center text-yellow-500 text-2xl font-bold mb-2">
                        Editar pregunta
                    </h2>
                </div>
                <div className="mb-4">
                    <h2 className="block text-gray-700 text-md font-bold mb-2">
                        Tipo pregunta: <span className="text-md  font-normal">{question.type}</span>
                    </h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="question">
                        Pregunta:
                    </label>
                    <textarea id="question" name="question" onChange={handleChange} rows="4" className=" shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.question}>
                    </textarea>
                </div>
                {/*     <div className="mb-6">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="imagen">
                        Imagen:
                        {!question.img ?
                            <span className="text-md  font-normal"> No existe imagen</span>
                            : <span className="text-md  font-normal"> {question.img}</span>}
                    </label>
                    <input onChange={handleChange} name="img" accept="image/*" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="imagen"></input>

                </div> */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                        Items:
                    </label>
                    <div className="overflow-auto h-52">

                        {question.body ? question.body.map((e, i) => {
                            return (

                                <div className="flex flex-wrap mx-3 mb-2  " key={shortid.generate()}>
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-2">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`imagen${i + 1}`}>
                                            Imagen {i + 1}:
                                            {!e.item[0] ?
                                                <span className="text-md  font-normal"> No existe imagen</span>
                                                : <a target="_blank" className="font-normal text-yellow-500" href={`https://drive.google.com/file/d/${e.item[0]}/view`}>
                                                    Ver Imagen
                                                </a>
                                            }
                                        </label>
                                        <input onChange={handleChange} name={`img${i}`} accept="image/*" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="imagen"></input>


                                    </div>
                                    <div className="  md:w-1/2 px-3  ">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`answer${i + 1}`}>
                                            Respuesta {i + 1}:
                                        </label>
                                        <input name={`answer${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={e.answer} id={`answer${i + 1}`} type="text" placeholder="Answer"></input>
                                    </div>

                                </div>
                            );
                        }) : <div>Cargando</div>}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                        Opciones adicionales :
                    </label>
                    <div className="overflow-auto h-52">

                        {question.options ? question.options.map((e, i) => {
                            return (

                                <div className=" mx-3 mb-6" key={shortid.generate()}>
                                    <div className="w-full  px-3 ">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`resadd${i + 1}`}>
                                            Respuesta {i + 1}:
                                        </label>
                                        <input name={`opcion${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={e} id={`resadd${i + 1}`} type="text" placeholder="Respuesta"></input>
                                    </div>

                                </div>
                            );
                        }) : <div>Cargando</div>}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handleForm} className="bg-green-500 hover:bg-greeb-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Actualizar
                    </button>

                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

export default Emparejar_img;