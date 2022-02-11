import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { mostrarExitoEditar } from '../../components/Alert/Alert'

const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";


const Ordenar = (props) => {
    return (<div>
        {console.log(props.question)}
    </div>)
}

export default Ordenar;