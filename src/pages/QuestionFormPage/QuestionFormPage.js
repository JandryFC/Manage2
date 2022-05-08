import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import Opcion_correcta1 from "../../components/FormQuestionEdit/Opcion_correcta1";
import Completar_texto from "../../components/FormQuestionEdit/Completar_texto";
import Emparejar_img from "../../components/FormQuestionEdit/Emparejar_img";
import True_false from "../../components/FormQuestionEdit/True_false";
import Opcion_correcta_n from "../../components/FormQuestionEdit/Opcion_correcta_n";
import Emparejar from "../../components/FormQuestionEdit/Emparejar";
import Ordenar from "../../components/FormQuestionEdit/Ordenar";
import { useNavigate } from "react-router-dom"
import { mostrarExitoEditar, selectnewRol } from '../../components/Alert/Alert'
import {
    useParams
} from "react-router-dom";


const USER = JSON.parse(localStorage.getItem("user"));

const QuestionFormPage = (props) => {

    const [question, setQuestion] = useState({})
    const { _id } = useParams()
    var navigate = useNavigate()
    
    const atras = () => {
        navigate(-1)
    }
    var formPage = null;
    const getQuestion = async () => {
        let data_question = null
        try {
            data_question = await fetch(`${process.env.REACT_APP_API_URL}question/${_id}`,
                {
                    method: "GET",
                    headers: {
                        token: process.env.REACT_APP_SECRET_TOKEN,
                    },
                })
        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            return;

        }
        var _question = await data_question.json()
        setQuestion(await _question)
    }

    useEffect(async () => {
        getQuestion();

    }, [])
    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        }
    })
    return (
        <div >
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
            <div className="w-full ">
                {
                    (() => {
                        switch (question.type) {
                            case "opcion_correcta_1":
                                return <Opcion_correcta1 question={question} />
                            case "emparejar_img":
                                return <Emparejar_img question={question} />

                            case "true_false":
                                return <True_false question={question} />

                            case "completar_texto":
                                return <Completar_texto question={question} />
                            case "emparejar":
                                return <Emparejar question={question} />

                            case "ordenar":
                                window.location.href = "/ErrorQuestion";
                                return;
                            /* return <Ordenar question={question} /> */
                            case "opcion_correcta_n":
                                return <Opcion_correcta_n question={question} />

                        }
                    })()
                }
            </div>

        </div>
    )
}

export default QuestionFormPage;