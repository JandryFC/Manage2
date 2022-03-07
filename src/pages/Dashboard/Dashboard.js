import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import SideBar from "../../components/SideBar/SideBar";
import Book from "../../components/Libros/Libro";
import CardPlus from "../../components/CardPlus/CardPlus";
import shortid from "shortid";
import { agregarLibro } from '../../helpers/fuctions'
import { mostrarExitoEditar, mostrarAlertaConfimacion } from '../../components/Alert/Alert'

import cargando_img1 from '../../assets/undraw_book_lover_re_rwjy (1).svg'
const API_URL = "http://localhost:5000/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";

const Dashboard = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const [cargando, setcargando] = useState(true);


  const addLibro = async () => {
    let result = mostrarAlertaConfimacion("Agregar Libro", "warning", "¿Estaá seguro de agregar un nuevo libro?")
    if ((await result).value) {
      try {
        const lib_ = agregarLibro(API_URL)
      } catch (e) {
        mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
        return;
      }
    }
    setcargando(false)
    setcargando(true)
  }

  useEffect(async () => {
    if (!USER) {
      window.location.href = '/';
    }
  }, []);

  //libros >> modulo >> unidad

  return (
    <div className="w-full">
      {cargando &&
        <NavComponent data={USER} />
      }
      <div className="p-4">
        <div className="flex mx-auto justify-center space-y-6 my-10">
          {cargando &&
            <div className="ml-36">
              <img src={cargando_img1} width="400px" />
              <div className="py-4">
                <h2 className="text-center font-extralight italic text-gray-700 text-2xl ">Escoge una Unidad </h2>
              </div>
              <div className="text-center">

                <button type="button" onClick={addLibro} className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">Agrega Libro</button>
              </div>
            </div>
          }
          {/*  <div className="my-auto">
            <CardPlus tema="Libro" />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
