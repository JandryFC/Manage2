import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import Opcion_correcta1 from "../../components/FormQuestionEdit/Opcion_correcta1";
import Completar_texto from "../../components/FormQuestionEdit/Completar_texto";
import Emparejar_img from "../../components/FormQuestionEdit/Emparejar_img";
import True_false from "../../components/FormQuestionEdit/True_false";
import Opcion_correcta_n from "../../components/FormQuestionEdit/Opcion_correcta_n";
import Emparejar from "../../components/FormQuestionEdit/Emparejar";
import Ordenar from "../../components/FormQuestionEdit/Ordenar";
import { mostrarExitoEditar, selectnewRol } from '../../components/Alert/Alert'
import {
    useParams
} from "react-router-dom";


const USER = JSON.parse(localStorage.getItem("user"));

const QuestionFormPage = (props) => {

    const [question, setQuestion] = useState({})
    const { _id } = useParams()
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
        <div>
            <NavComponent data={USER} />
            <div className="">
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