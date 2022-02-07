import React, { useState, useEffect } from "react";
import axios from 'axios';
import shortid from "shortid";
const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";


const Opcion_correcta1 = (props) => {

    const [form, setForm] = useState({})
    const [question, setQuestion] = useState({});
    var formData = new FormData() 

    
    const handleChange = async (e) => {
        const aux_question = question;
        const value = e.target.value;

        if (e.target.name === "question") {
            aux_question.question = value

        } if (e.target.name === "img") {
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
        setQuestion(aux_question)
        formData.set("question", JSON.stringify(question))
    };


    const handleForm = async (e) => {
        e.preventDefault();
        const data_upload = await fetch(`${API_URL}editQuestion`,
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
            console.log("data", upload)
    }
    useEffect(async () => {
        setQuestion(props.question) 
        formData.set("question", JSON.stringify(question))
    })
    return (

        <div className="w-full max-w-xl">
            {console.log(question)}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <h2 className="block text-center text-yellow-500 text-xl font-bold mb-2">
                        Editar pregunta:
                    </h2>
                </div>
                <div className="mb-4">
                    <h2 className="block text-gray-700 text-md font-bold mb-2">
                        Tipo pregunta: <span className="text-md  font-normal">{question.type}</span>
                    </h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="question">
                        Pregunta
                    </label>
                    <textarea id="question" name="question" onChange={handleChange} rows="4" className=" shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.question}>
                    </textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="imagen">
                        Imagen:
                        {!question.img ?
                            <span className="text-md  font-normal"> No existe imagen</span>
                            : <span className="text-md  font-normal"> {question.img}</span>}
                    </label>
                    <input onChange={handleChange} name="img" accept="image/*" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="imagen"></input>

                </div>
                <div className="mb-4">
                    <div className="overflow-auto h-52">

                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                            Respuestas:
                        </label>
                        {question.options ? question.options.map((e, i) => {
                            return (

                                <div className=" mx-3 mb-6" key={shortid.generate()}>
                                    <div className="w-full  px-3 ">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`respuesta${i + 1}`}>
                                            Respuesta {i + 1}
                                        </label>
                                        <input name={`item${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={e.item} id={`respuesta${i + 1}`} type="text" placeholder="Respuesta"></input>
                                    </div>

                                </div>
                            );
                        }) : <div>Cargando</div>}
                    </div>
                    <div className="inline-block relative w-64">
                        <label htmlFor="respuesta_correcta" className="block text-gray-700 text-md font-bold mb-2">Respuesta correcta: </label>
                        <select id="respuesta_correcta" name="answer" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            {question.options ? question.options.map((e, i) => {
                                return (<option value={i} key={shortid.generate()}>{`Respuesta ${i + 1}`}</option>)
                            }) : <option>Sin opciones</option>
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handleForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )


}
export default Opcion_correcta1;