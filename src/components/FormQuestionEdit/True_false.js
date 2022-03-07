import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'

const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";

const True_false = (props) => {
    const [question, setQuestion] = useState({});
    var formData = new FormData()
    var navigate = useNavigate()
    const [checked, setCheked] = useState([])
    
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
          
            let i = parseInt(name.substr(-1))
            let answer_false = [["T", false], ["F", true]];
            let answer_true = [["T", true], ["F", false]];
            if (e.target.checked) {
                aux_question.body[i].answer = answer_true
                document.getElementById(`label${i}`).innerHTML = "Verdadero"
            } else {
                aux_question.body[i].answer = answer_false
                document.getElementById(`label${i}`).innerHTML = "Falso"
            }
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
        if (upload.msg === "CORRECT") {
            var result = mostrarExitoEditar("Exito", "La pregunta fue almanceda correctamente", "success")
            if (await result) {
                navigate(-1)
            }

        } else {
            mostrarExitoEditar("Error", "Hubo un problema al agregar la pregunta", "error")
        }
    }

    useEffect(async () => {
        setQuestion(props.question)
        console.log(question)
        formData.set("question", JSON.stringify(question))
    })

    /* useEffect(async ()=>{
        
    }, [checked]) */
    return (
        <div className="w-full max-w-xl m-auto py-5">
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
                <div className="mb-6">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="imagen">
                        Imagen:
                        {!question.img ?
                            <span className="text-md  font-normal"> No existe imagen</span>
                            : <a target="_blank" className="font-normal text-yellow-500" href={`https://drive.google.com/file/d/${question.img}/view`}>
                            Ver Imagen
                        </a>}
                    </label>
                    <input onChange={handleChange} name="img" accept="image/*" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="imagen"></input>

                </div>
                <div className="mb-4">
                    <div className="overflow-auto h-52">

                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                            Items:
                        </label>
                        {question.body ? question.body.map((e, i) => {
                            return (

                                <div className="flex flex-wrap -mx-3 mb-2  " key={shortid.generate()}>
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0 ">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`item${i + 1}`}>
                                            Item {i + 1}:
                                        </label>
                                        <input name={`item${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={e.item[0]} id={`item${i + 1}`} type="text" placeholder="item"></input>
                                    </div>
                                    <div className="  md:w-1/3 px-3  ">
                                        <h2 className="block text-gray-700 text-md font-bold mb-2" >
                                            Respuesta {i + 1}:
                                        </h2>
                                        <div className="form-check form-switch py-2">
                                            <input onChange={handleChange} name={`answer${i}`} className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={e.answer[0][1]} />
                                            <label id={`label${i}`}  className="form-check-label inline-block text-gray-800" htmlFor="flexSwitchCheckDefault" > {e.answer[0][1]? "Verdadero": "Falso"}</label>
                                        </div>
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

export default True_false;