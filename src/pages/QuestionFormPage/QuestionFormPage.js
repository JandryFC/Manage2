import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import Opcion_correcta1 from "../../components/FormQuestion/Opcion_correcta1";
import {
    useParams
} from "react-router-dom";


const API_URL = "http://localhost:5000/";
const USER = JSON.parse(localStorage.getItem("user"));
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";


const QuestionFormPage = (props) => {

    const [question, setQuestion] = useState({})
    const { _id } = useParams()

    const getQuestion = async () => {
        const data_question = await fetch(`${API_URL}question/find/${_id}`,
            {
                method: "GET",
            /* headers: {
      token: API_KEY,
    }, */}
        )
        var _question = await data_question.json()
        setQuestion(await _question)
    }

    useEffect(async ()=>{
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
               <Opcion_correcta1 question={question} />
            </div>
        </div>
    )
}

export default QuestionFormPage;