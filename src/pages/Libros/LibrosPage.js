
import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import NavLateral from "../../components/NavComponent/NavLateral";

import cargando_img1 from '../../assets/undraw_book_lover_re_rwjy (1).svg'

const LibrosPage = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const [cargando, setcargando] = useState(true);


  useEffect(async () => {
    if (!USER) {
      window.location.href = '/';
    }
  }, []);

  //libros >> modulo >> unidad

  return (
    <div className="w-full ">
      {cargando &&
        <NavComponent data={USER} />
      }
      
      <div className="md:flex">
        <div>
            {cargando &&
                <NavLateral  data={USER} />
            }
        </div>
        <div className="p-4 md:px-10">
            <section className="pb-20 relative block bg-white  shadow-lg rounded-lg">
            <div className="relative pt-10 flex content-center items-center justify-center ">
            
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-9/12 px-4 ml-auto mr-auto text-center">
                        <div className="md:pb-5">
                            <h1 className=" font-semibold text-2xl md:text-4xl">
                            GESTIONAR CONTENIDO
                            </h1>
                            <p className="hidden md:block text-sm leading-relaxed mt-4  text">
                            Utilice la barra lateral para gestionar la información en la sección que desee
                            </p>
                            <p className="md:hidden md:text-lg text-sm leading-relaxed mt-4  text">
                            Utilice la barra superior para gestionar la información en la sección que desee
                            </p>
                            {USER.rol_select !== "Administrador" && 
                            (
                            <p className=" text-gray-400 text-sm">
                            (Si desea crear un nuevo libro debe solicitarlo al administrador )
                            </p>
                            )}
                            <div className="mb-4"></div>
                        </div>

                    </div>
                </div> 
            </div>
            </div> 
            <div className="container mx-auto px-4  ">
                <div className="flex flex-wrap text-center justify-center">

                </div>
                <div className="flex flex-wrap items-center ">
                    <div className="w-full md:w-3/12 w-1/12 px-4 mr-auto ml-auto">
                        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 ">
                        <img
                            alt="..."
                            src={cargando_img1}                    
                            className="align-middle rounded-t-lg"
                        />

                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap text-center justify-center ">
                <div className="w-full lg:w-8/12 px-4 ">
                    
                    <p className="text-md leading-relaxed mt-4  text-gray-700">
                    El sistema permite las siguientes opciones:
                    </p>
                </div>
                </div>
                <div className="flex flex-wrap mt-5 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center ">
                    <div className="text-gray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <h6 className="text-xl mt-5 font-semibold  ">
                    Añadir
                    </h6>
                    <p className="mt-2 mb-4 text-gray-700">
                    Nuevas lecciones a cada una de las actividades disponibles, al igual que nuevas preguntas
                    </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center ">
                    <div className="text-gray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg><i className="fas fa-poll text-xl"></i>
                    </div>
                    <h5 className="text-xl mt-5 font-semibold  ">
                    Modificar
                    </h5>
                    <p className="mt-2 mb-4 text-gray-700">
                    Cada una de las preguntas existentes
                    </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center ">
                    <div className="text-gray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm1 8a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <h5 className="text-xl mt-5 font-semibold ">
                    Eliminar
                    </h5>
                    <p className="mt-2 mb-4 text-gray-700">
                    Lecciones de cada una de las actividades disponibles, al igual que las preguntas existentes
                    </p>
                </div>
                </div>
            </div>
            </section>
        </div>
      </div>
      
    </div>
  );
};
export default LibrosPage;