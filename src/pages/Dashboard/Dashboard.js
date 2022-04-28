import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import NavLateral from "../../components/NavComponent/NavLateral";
import { agregarLibro } from '../../helpers/fuctions'
import { mostrarExitoEditar, mostrarAlertaConfimacion } from '../../components/Alert/Alert'

import cargando_img1 from '../../assets/undraw_book_lover_re_rwjy (1).svg'

const Dashboard = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const [cargando, setcargando] = useState(true);


  const addLibro = async () => {
    let result = mostrarAlertaConfimacion("Agregar Libro", "warning", "¿Está seguro de agregar un nuevo libro?")
    //console.log((await result).value)
    if ((await result).value) {
      try {
         agregarLibro(process.env.REACT_APP_API_URL)
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
      {cargando &&
        <NavLateral  data={USER} />
      }
      
      <div className="p-4">
        <div className="flex mx-auto justify-center space-y-6 my-10">
          {cargando &&
            <div className="ml-36">
              <img src={cargando_img1} width="400px" />
              <div className="py-4">
                <h2 className="text-center font-extralight italic text-gray-700 text-2xl ">GESTIONAR INFORMACIÓN  </h2>
                <h2 className="text-center font-extralight italic text-gray-700 text-lg ">Dirijase a la barra lateral </h2>
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
