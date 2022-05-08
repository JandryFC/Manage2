/*eslint-disable*/

import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { faAngleDown, faBook, faBookOpen, faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import shortid from "shortid";
import { llenarInfo, agregarLibro } from '../../helpers/fuctions'
import { mostrarExitoEditar, mostrarAlertaConfimacion } from '../Alert/Alert'


const NavLateral = (props) => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [libros, setLibros] = useState({});
  const [cargando, setCargando] = useState(true);

  const addLibro = async () => {
    let result = mostrarAlertaConfimacion("Agregar Libro", "warning", "¿Estaá seguro de agregar un nuevo libro?")
    if ((await result).value) {
      try {
        agregarLibro(process.env.REACT_APP_API_URL)
      } catch (e) {
        mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
        return;
      }
    }
    setCargando(false)
    setCargando(true)
  }


  useEffect(() => {
    getUserResponse()
    //console.log('id',props.data._id)
  }, [cargando])

  const getUserResponse = async () => {
    let user_id = props.data._id;
    
    let _libros = null
    try {
      _libros = await llenarInfo(process.env.REACT_APP_API_URL, user_id)
      //console.log(_libros)
    } catch (e) {

      mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
      return;
    }
    setLibros(_libros)
    setCargando(false)

  }
  return (
    <>
      <nav className="md:left-0 md:h-full md:block  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl md:bg-white bg-gray-50 flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between  w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            id='hamburger'
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Brand */}
          <div
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          >
            libros
          </div>
 
          {/* Collapse */}
          <div
            className={
              "md:flex md:bg-white bg-gray-50 md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow-lg absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full h-8 md:hidden block pb-4 mb-4 border-b border-solid border-gay-200 ">
              <div className="flex flex-wrap">
                <div className="w-6/12 flex justify-left">
                  <button
                    type="button"
                    id='hamburger'
                    className="cursor-pointer text-black opacity-50 md:hidden px-3  text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                </div>
                <div className="w-6/12 ">
                  
                </div>
                
              </div>
            </div>

            {/* Heading */}
            {props.data.rol_select === 'Administrador'?
            <div>
              <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                GESTIONAR LIBRO
              </h6>

              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                  
                  <li className="relative">
                  <a onClick={addLibro} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                      <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faPlus} />
                      <span className="font-bold">Crear Nuevo Libro</span>
                  </a>
                  </li>          
              </ul>
            </div>
            :
            <div></div>
            }
            {/* Divider */}
            <hr className="pb-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            MODIFICAR LIBRO
            </h6>
            {/* Navigation */}

            <ul className=" relative px-1 overflow-y-auto h-4/5">
                <li className="relative" id="sidenavSecEx2">
                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-controls="collapseSidenavSecEx2">
                    <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faBook} />
                    <span>Lista de Libros</span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
                </a>
                <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample1">
                    {!cargando && (
                    libros.libros.map((_libro, i_libro) => (
                        <li className="ml-3 relative" key={shortid.generate()} id="sidenavSecEx3">
                        <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx3" aria-controls="collapseSidenavSecEx3">
                            <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faBookOpen} />
                            <span>Libro {i_libro + 1}</span>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                            </svg>
                        </a>
                        <ul className="relative accordion-collapse collapse" id="collapseSidenavSecEx3" aria-labelledby="sidenavSecEx3" data-bs-parent="#sidenavSecEx3">
                            {!cargando && (
                            _libro.modulos.map((_modulo, i_modulo) => (
                                <li className="ml-3 relative" key={shortid.generate()} id="sidenavXxEx2">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavXxEx2" aria-expanded="false" aria-controls="collapseSidenavXxEx2">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path>
                                    </svg>
                                    <span>Modulo {i_modulo + 1}</span>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                    </svg>
                                </a>
                                <ul className="relative accordion-collapse collapse" id="collapseSidenavXxEx2" aria-labelledby="sidenavXxEx2" data-bs-parent="#sidenavXxEx2">
                                    {_modulo.map((_unidad, i_unidad) =>
                                    (<li className="ml-3 relative" key={shortid.generate()}>
                                    <a href={`/books/book/${i_libro + 1}/module/${i_modulo + 1 === 1 ? ((i_libro + 1) * 2) - 1 : (i_libro + 1) * 2}/unit/${i_unidad + 1}`} className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                        <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faBookmark} />
                                        <span>Unidad {i_unidad + 1}</span></a>
                                    </li>)
                                    )}
                                </ul>
                                </li>
                            ))
                            )}
                        </ul>
                        </li>
                    ))
                    )}

                </ul>
                </li>
            </ul>


          </div>
        </div>
      </nav>
    </>
  );
}
export default NavLateral;