import React, { useEffect, useRef, useState } from "react";
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
  const [libros, setLibros] = useState({});
  const [cargando, setCargando] = useState(true);
  const [roles, setRoles] = useState([])
  const hamburgerBtn = useRef();
  const hamburgerItems = useRef();

  const handleHamburgerButton = () => {
    hamburgerItems.current.classList.toggle("hidden");
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  }
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "./";
  }
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
      console.log("response", user_response)
    } catch (e) {
      mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
      return;
    }
    var user_response = await user_response.json()
    if (user_response.rol.find(e => e === props.data.rol_select)) {
      user_response = { ...user_response, rol_select: props.data.rol_select }
    } else {
      user_response = { ...user_response, rol_select: user_response.rol[user_response.rol[0] === "Estudiante" ? 1 : 0] }

    }
    setUser(await user_response)
    setRoles((roles) => [...cambiarRoles(user_response)])
    let _libros = null
    try {
      _libros = await llenarInfo(process.env.REACT_APP_API_URL, user_response._id)
      console.log(_libros)
    } catch (e) {

      mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
      return;
    }
    setLibros(_libros)
    setCargando(false)

  }
  const cambiarRoles = (roles) => {
    let aux = roles.rol
    aux = aux.filter(e => e !== roles.rol_select)
    aux = aux.filter(e => e !== "Estudiante")
    return aux;
  }

  return (
    <div>
      {/* side bar */}
      <div className="w-60  h-full shadow-md bg-white absolute" id="sidenavSecExample1">
        <div className="pt-4 pb-2 px-6 bg-green-800">
          <a href="#!">
            <div className="flex items-center">
              <div className="shrink-0">
                <img src={logobn} className="rounded-full w-10" alt="Avatar" />
              </div>
              <div className="grow ml-3 ">
                <p className="text-sm font-semibold text-white capitalize">
                  {user.lastname == null ? user.name : `${user.name} ${user.lastname}`}
                </p>
              </div>
            </div>
          </a>
        </div>
        <ul className=" relative px-1 overflow-y-auto h-4/5">
          <li className="relative">
            <a onClick={addLibro} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
              <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faPlus} />
              <span className="font-bold">Agregar Libros</span>
            </a>
          </li>
          <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
              <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faBook} />
              <span className="font-bold">Libros Actuales</span>
            </a>
          </li>
          <li className="relative" id="sidenavSecEx2">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-controls="collapseSidenavSecEx2">
              <FontAwesomeIcon className="w-3 h-3 mr-3" icon={faBook} />
              <span>Libros</span>
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
                                <a href={`/dashboard/book/${i_libro + 1}/module/${i_modulo + 1 === 1 ? ((i_libro + 1) * 2) - 1 : (i_libro + 1) * 2}/unit/${i_unidad + 1}`} className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
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
        <div className="text-center bottom-0 absolute w-full">
          <hr className="m-0" />
          <p className="py-2 text-sm font-semibold text-gray-700">Universidad Ténica de Manabí</p>
        </div>
      </div>


      {/* nav bar */}
      <nav className="static bg-green-800 dark:bg-gray-800  shadow  ">
        <div className="max-w-7xl mx-auto ">
          <div className="flex items-center justify-between h-16">
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

              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="uppercase sm:text-base font-medium py-1 text-white flex text-sm rounded-full focus:outline-none  ">
                    <p className="mx-2">
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
                        <p className="text-sm text-center font-normal">Sin rol</p>
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
        {/* <div className="md:hidden">
            <div
              className="px-2 pt-2  pb-3 space-y-1 sm:px-3 hidden"
              ref={this.hamburgerItems}
            >
              <a
                className="text-gray-100 hover:text-yellow-500 dark:hover:text-yellow block px-3 py-2 rounded-md text-base font-medium"
                href="/dashboard"
              >
                Learning
              </a>
              <a
                className="text-gray-100 hover:text-yellow-500 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/evaluacion"
              >
                Evaluation
              </a>
            </div>
          </div> */}
      </nav>
    </div>
  )
}

export default NavComponent;
