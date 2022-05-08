import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import NavLateral from "../../components/NavComponent/NavLateral";
import { agregarLibro } from '../../helpers/fuctions'
import { mostrarExitoEditar, mostrarAlertaConfimacion } from '../../components/Alert/Alert'

import cargando_img1 from '../../assets/undraw_book_lover_re_rwjy (1).svg'

const Dashboard = () => {
  
  const USER = JSON.parse(localStorage.getItem("user"));
  const [cargando, setcargando] = useState(true);



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
      {/*cargando &&
        <NavLateral  data={USER} />
    */}
       <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://blog.fromdoppler.com/wp-content/uploads/main_reportes_de_email_marketing.png')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-80 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                <div className="md:pb-5">
                  <h1 className="text-white font-semibold text-2xl md:text-4xl">
                  BIENVENIDO AL SISTEMA DE GESTIÓN DEL MOOC DE IDIOMAS
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-10 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
            {USER.rol_select === "Administrador" &&
              (
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    </div>
                    <h6 className="text-xl font-semibold">REPORTES</h6>
                    <p className="mt-2 mb-4 text-gray-500">
                      Visualiza la información respectiva a las usuarios y al contenido del mooc
                    </p>
                    <a href="/Reporting">
                      <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-blue-400" >
                        Ingresar
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              )}
              <div className={USER.rol_select === "Administrador"?"w-full md:w-4/12 px-4 text-center" :"mx-auto px-4 text-center"}>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    </div>
                    <h6 className="text-xl font-semibold">CONTENIDO</h6>
                    <p className=" text-gray-500">
                      Gestiona la información de cada uno de los libros disponibles en el mooc
                    </p>

                    <div className="mt-2 mb-4 text-gray-500">

                    </div>
                    <a href="/books">
                      <button className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-red-400" >
                        Ingresar
                      </button>
                    </a>

                  </div>
                  
                </div>
              </div>
              {USER.rol_select === "Administrador" &&
              (
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <h6 className="text-xl font-semibold">PRIVILEGIOS</h6>
                    <p className="mt-2 mb-4 text-gray-500">
                      Gestiona el rol de los usuarios (administrador - docente)
                    </p>
                    <a href="/privileges">
                      <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-green-400" >
                        Ingresar
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              )}
            </div>

            <div className="flex flex-wrap items-center mt-5">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 ">
                  <img
                    alt="..."
                    src={cargando_img1}                    
                    className="align-middle rounded-t-lg"
                  />

                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="relative bg-gray-800 ">
            <div className="container mx-auto px-4 ">
                <div className="flex flex-wrap sm:text-left pt-8 sm:pl-8 text-center lg:text-left">
                    <div className="w-full md:w-6/12 lg:px-4">
                        <h4 className="text-lg font-semibold text-gray-100">TECHNICAL UNIVERSITY OF MANABI</h4>
                        <h5 className="text-xs mt-0 mb-2 text-gray-100">
                        MANAGE SYSTEM
                        </h5>
                        
                    </div>
                    <div className="w-full pt-2 md:pt-0 md:w-6/12 pl-4">
                        <div className="flex  items-top mb-6">
                            <div className="w-full pl-4 ml-auto">
                                <h4 className="text-xs font-semibold text-gray-100">DEVELOPING</h4>
                                <h5 className="text-xs mt-0 mb-2 text-gray-100">
                                Faculty of Informatics Sciences UTM
                                </h5>
      
                            
                            </div>
                            <div className="w-full px-4">
                                <h4 className="text-xs font-semibold text-gray-100">CONTENT</h4>
                                    <h5 className="text-xs mt-0 mb-2 text-gray-100">
                                    UTM Language Department
                                    </h5>
   
                            </div>
                        </div>
                    </div>
                </div>
                <hr className=" border-blueGray-300" />
                <div className="flex py-2 flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-gray-100  py-1">
                            Copyright © <span id="get-current-year">2022</span><a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noreferrer"/> 
                            <a href="https://www.creative-tim.com?ref=njs-profile" class="text-blueGray-500 hover:text-blueGray-800"></a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};
export default Dashboard;
