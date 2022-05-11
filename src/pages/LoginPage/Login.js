import React, { useState } from "react";
import logo_utm from "../../assets/Logo_utm.png";
import loading from "../../assets/loading.svg";
import axios from "axios";
import { mostrarAlertaSalir, mostrarExitoEditar } from "../../components/Alert/Alert";


const Login = () => {
  const [isVisibleDato, setIsVisibleDato] = useState("hidden");
  const [dato, setDato] = useState("");
  const [userStorage, setUserStorage] = useState({});
  const [form, setForm] = useState({
    rol: "Administrador"
  });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const viewTextMessage = (visible, text) => {
    setDato(text);
    if (visible) {
      setIsVisibleDato("visible");
    } else {
      setIsVisibleDato("");
    }
    setCargando(false);
    setInterval(() => {
      setDato("");
      setIsVisibleDato("hidden");
    }, 10000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = []
    setCargando(true);
    try {
        response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/signin`,
        {
          mail: form.mail,
          password: form.password,
        },
        {
          headers: {
            token: process.env.REACT_APP_SECRET_TOKEN,
          },
        }
      );
      
    } catch (error) {
        mostrarExitoEditar("Error", "No se encontró conexión con el servidor, vuelva a intentarlo", "error")
        setCargando(false);
        return;
    }
    
    setCargando(false);
    let data = response.data;
      //console.log('data',data)
    if (data.res === "USER NOT EXIST") {
      viewTextMessage(false, "El usuario no existe");
    } else if (data.res === "PASSWORD INCORRECT") {
      viewTextMessage(false, "La contraseña es incorrecta");
    } else if (data.res === "ERROR") {
      viewTextMessage(false, "Hubo un problema al conectar con el servidor");
    } else if (data.res === "incorrecta") {
      viewTextMessage(
        false,
        "Usuario o contraseña incorrectas, por favor verificar."
      );
    } else {
      let user = []
      try {
        user = data.res;
        if (user.rol.find(e => e === form.rol)) {
          localStorage.setItem("user", JSON.stringify({"_id": user._id, "rol_select": form.rol,"rol":user.rol,"name": user.name,"lastname": user.lastname,"mail": user.mail}));
            window.location.href = "./dashboard";
        }else{
          viewTextMessage(false, "Usuario no tiene rol " + form.rol);
        }
      } catch (error) {
        mostrarExitoEditar("Error", "No se encontró conexión con el servidor, vuelva a intentarlo", "error")
        setCargando(false);
        return;
      }
      
      

      
    }
  };

  const handleChecked = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <div className="grid justify-items-center">
      <div className="m-4 p-4 space-y-8">
        <div className="text-center">
          <img src={logo_utm} width="400" />

          <h2 className="text-2xl font-bold">Sistema de Administración </h2>
          <h2 className="text-xl">Inicie Sesión</h2>
          <div className={isVisibleDato}>
            <h2 className="text-md text-red-500">{dato}</h2>
          </div>
          {/* aqui */}
          <form className=" space-y-4">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="mail"
                  type="email"
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  value={form.mail}
                  className=" border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500  focus:z-10 sm:text-sm appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none "
                  placeholder="Correo electrónico"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={form.password}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
            <div className="flex justify-center">
              <div className="sm:w-40 ">
                <select  onChange={handleChange} name="rol" value={form.rol} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                  <option value="Administrador" >Administrador</option>
                  <option value="Docente">Docente</option>
                </select>
              </div>
            </div>
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  onChange={handleChecked}
                  value={form.remember}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recuerdame
                </label>
              </div>
            </div>
            {cargando && (
              <div className="flex items-center justify-center">
                <img src={loading} width={50} alt="cargando"></img>
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={cargando}
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-yellow-400"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-yellow-600 group-hover:text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Registrar
              </button>
            </div>
          </form>
          {/* termina */}
        </div>
      </div>
      <script>
        {window.onload = function () {
          const saved = localStorage.getItem("user");
          if (saved) {
            mostrarAlertaSalir();
          }
        }}
      </script>
    </div>
  );
};

export default Login;
