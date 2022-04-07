import React, { useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import Opcion_correcta1 from "../../components/FormQuestionNew/Opcion_correcta1";
import Completar_texto from "../../components/FormQuestionNew/Completar_texto";
import Emparejar_img from "../../components/FormQuestionNew/Emparejar_img";
import True_false from "../../components/FormQuestionNew/True_false";
import Opcion_correcta_n from "../../components/FormQuestionNew/Opcion_correcta_n";
import Emparejar from "../../components/FormQuestionNew/Emparejar";
import Ordenar from "../../components/FormQuestionNew/Ordenar";
import {
    useParams
} from "react-router-dom";

const USER = JSON.parse(localStorage.getItem("user"));

const NewQuestion =(props) =>{
    const {task_number, type} = useParams();
    var question = {
        body: [], 
        options: [], 
        question: "", 
        task_id: task_number, 
        type: type
    }

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        }
    })
    return (<div>
        <NavComponent data={USER} />
        <div className="">
            {
                (() => {
                    switch (type) {
                        case "opcion_correcta_1":
                            return <Opcion_correcta1 question={question} />
                        case "emparejar_img":
                            return <Emparejar_img  question={question} />
                        case "true_false":
                            return <True_false  question={question} />
                        case "completar_texto":
                            return <Completar_texto  question={question} />
                        case "emparejar":
                            return <Emparejar  question={question} />
                        /* case "ordenar":
                            return <Ordenar  question={question} /> */
                        case "opcion_correcta_n":
                            return <Opcion_correcta_n  question={question} />
                    }
                })()
            }
        </div>
    </div>)
}

export default NewQuestion;