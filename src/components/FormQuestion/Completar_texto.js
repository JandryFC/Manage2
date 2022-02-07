import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'

const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";



const Completar_texto = (props) =>{

    const [question, setQuestion] = useState({});
    var formData = new FormData()
    var navigate = useNavigate()

    useEffect(async () => {
        setQuestion(props.question)
        formData.set("question", JSON.stringify(question))
    })
    return (
        <div>pregunta 2
            {console.log(question)}
        </div>
    )
}

export default Completar_texto;