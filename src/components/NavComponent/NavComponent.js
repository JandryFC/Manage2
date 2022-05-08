import React, { useEffect,createRef, useRef, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { faAngleDown, faBook, faBookOpen, faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import userLogo from "../../assets/user.png";
import logobn from "../../assets/Logo_utm1.png";
import shortid from "shortid";
import { llenarInfo, agregarLibro } from '../../helpers/fuctions'
import { mostrarExitoEditar, mostrarAlertaConfimacion } from '../Alert/Alert'

const NavComponent = (props) => {
  const [user, setUser] = useState({
  });
  const [cargando, setCargando] = useState(true);
  const [roles, setRoles] = useState([])
  const hamburgerBtn = createRef();
  const hamburgerItems = createRef();

  const handleHamburgerButton = () => {
    hamburgerItems.current.classList.toggle("hidden");
    //console.log(hamburgerItems)
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  }
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "./";
  }

  const cambiarPerfil = (e) => {
    let aux_user = user;
    aux_user.rol_select = e.target.innerHTML;
    let data_props = props.data;
    data_props.rol_select = e.target.innerHTML
    localStorage.setItem("user", JSON.stringify(
      data_props
    ))
    let aux = cambiarRoles(aux_user);
    setUser(aux_user)
    setRoles((roles) => [...aux])
  }

  useEffect(() => {
    getUserResponse()

  }, [cargando])

  const getUserResponse = async () => {

    var user_response = props.data

    setUser(await user_response)
    setRoles((roles) => [...cambiarRoles(user_response,0)])
    setCargando(false)

  }
  const cambiarRoles = (roles,ct) => {
    //
    let aux = Array(roles.rol)[0]
    aux = aux.filter(e => e !== roles.rol_select)
    aux = aux.filter(e => e !== "Estudiante")
    if(ct!==0){
      let control=verificar(roles.rol_select)
      if(control){
        window.location.href = "/dashboard";
        return aux;
      }else{
        alert('NO CUENTA CON DICHO ROL')
        return roles.rol_select
      }
    }else{
      return aux;
    }
    
    
  }

  const verificar = async (rol)=>{
    let user_id = props.data._id;
    try {
      user_response = await fetch(`${process.env.REACT_APP_API_URL}user/${user_id}`,
        {
          method: "GET",
          headers: {
               token: process.env.REACT_APP_SECRET_TOKEN, 
          },
        }
      )
      //console.log("response", user_response)
    } catch (e) {
      mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
      return;
    }
    var user_response = await user_response.json()
    if (user_response.rol.find(e => e === rol)) {
      //console.log('rol valido')
      return true 
    } else {
      //console.log('rol invalido')
      return false
    }
  }

  return (
    <div className="h-full">

      {/* nav bar */}
      <nav className="static w-full bg-green-800 dark:bg-gray-800  shadow  ">
        <div className="px-10  mx-auto ">
          <div className="flex items-center justify-between h-16 ">
            <div className=" flex items-center">
              <a className="flex-shrink-0" href="/dashboard">
                <img className="" width="125px" src={logobn} alt="Workflow" />
              </a>
              <div className="hidden md:block font-bold">
                <div className=" ml-24 flex items-baseline space-x-4">
                  <a
                    className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href="/dashboard"
                  >
                    Inicio
                  </a>
                  <a
                    className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href="/books"
                  >
                    Contenido
                  </a>
                  {user.rol_select === "Administrador" &&
                    (
                      <div>
                        <a
                          className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                          href="/Reporting"
                        >
                          Reportes
                        </a>

                        <a
                          className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                          href="/privileges"
                        >
                          Privilegios
                        </a>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                className="text-gray-100  dark:text-white hover:text-yellow-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                id="hamburger"
                ref={hamburgerBtn}
                onClick={handleHamburgerButton}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
            <div className="p-2 flex ">
                  
              <Menu as="div" className="ml-3 relative hidden md:block ">
                <div>
                  <Menu.Button className="uppercase sm:text-base font-medium py-1 text-white flex text-sm rounded-full focus:outline-none  ">
                    <p className="mx-2 text-sm">
                      {user.rol_select}
                    </p>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div className="mx-auto px-4 py-2 uppercase  flex">
                      <p className="text-sm text-center font-bold">Cambiar Rol</p>
                    </div>

                    {
                      roles.length > 0 ? roles.map(e =>
                      (
                        <Menu.Item key={shortid.generate()}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <button onClick={cambiarPerfil}>{e}</button>
                            </div>
                          )}
                        </Menu.Item>
                      )) : <div className="mx-auto px-4 py-2 capitalize  flex">
                        <p className="text-sm text-center font-normal">No posee otros roles</p>
                      </div>
                    }


                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 " src={userLogo} alt="" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-center text-gray-700"
                          )}
                        >
                          <div className="mx-auto">
                            <img className="h-15 w-15 " src={userLogo} alt="" />
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          <h2 className="text-sm font-bold text-center">  {user.lastname == null ? user.name : `${user.name} ${user.lastname}`}</h2>
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          <button onClick={logout}>Cerrar sesión</button>
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <div className="md:hidden text-center">
            <div
              className="px-2  pb-3 space-y-1 sm:px-3 hidden"
              ref={hamburgerItems}
            >
              <a
                    className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href="/dashboard"
                  >
                    Inicio
                  </a>
                  <a
                    className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    href="/books"
                  >
                    Contenido
                  </a>
                  {user.rol_select === "Administrador" &&
                    (
                      <div className="">
                        <a
                          className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                          href="/Reporting"
                        >
                          Reportes
                        </a>

                        <a
                          className="text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                          href="/privileges"
                        >
                          Privilegios
                        </a>
                      </div>
                    )
                  }
                   <Menu as="div" className="ml-3 relative ">
                    <div className="bg-gray-500 rounded-lg ">
                      <Menu.Button className="uppercase items-center  sm:text-base font-medium py-1 text-white  text-sm rounded-full focus:outline-none  ">
                        <p className="mx-2 text-sm text-center  ">
                          {user.rol_select} <FontAwesomeIcon icon={faAngleDown} />
                        </p>
                        
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                  <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div className="mx-auto px-4 py-2 uppercase  flex">
                      <p className="text-sm text-center font-bold">Cambiar Rol</p>
                    </div>

                    {
                      roles.length > 0 ? roles.map(e =>
                      (
                        <Menu.Item key={shortid.generate()}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <button onClick={cambiarPerfil}>{e}</button>
                            </div>
                          )}
                        </Menu.Item>
                      )) : <div className="mx-auto px-4 py-2 capitalize  flex">
                        <p className="text-sm text-center font-normal">No posee otros roles</p>
                      </div>
                    }


                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
           
        </div> 
      </nav>
    </div>
  )
}

export default NavComponent;