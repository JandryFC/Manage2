class NavComponent extends React.Component {

    constructor(props) {
      super(props);
      let user_aux = this.props.data.rol
      user_aux = user_aux.filter(e => e !== this.props.data.rol_select)
      user_aux = user_aux.filter(e => e !== "Estudiante")
  
      this.state = {
        user: this.props.data,
        roles: user_aux
      }
      this.hamburgerBtn = createRef();
      this.hamburgerItems = createRef();
      this.cambiarPerfil = this.cambiarPerfil.bind(this);
    }
    handleHamburgerButton = () => {
      this.hamburgerItems.current.classList.toggle("hidden");
    };
    classNames(...classes) {
      return classes.filter(Boolean).join(" ");
    }
  
    cambiarPerfil(e) {
      let aux_user = this.state.user;
      aux_user.rol_select = e.target.innerHTML;
      this.setState({ user: aux_user })
    }
  
    logout() {
      localStorage.removeItem("user");
      window.location.href = "./";
    }
    render() {
      return (
        <div>
          <nav className="static bg-green-800  dark:bg-gray-800  shadow  ">
            <div className="max-w-7xl mx-auto ">
              <div className="flex items-center justify-between h-16">
                <div className=" flex items-center">
                  <a className="flex-shrink-0" href="/dashboard">
                    <img className="" width="125px" src={logobn} alt="Workflow" />
                  </a>
                  {/* <div className="hidden md:block">
                    <div className=" ml-10 flex items-baseline space-x-4">
                      <a
                        className={this.props.activado===1?"font-semibold text-yellow-400 uppercase  hover:text-white dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium":"text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                        href="/dashboard"
                      >
                        Learning
                      </a>
                      <a
                        className={this.props.activado===2?"font-semibold text-yellow-400  uppercase hover:text-white  dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium":"text-white dark:text-white  hover:text-yellow-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
                        href="/evaluacion"
                      >
                        Evaluation
                      </a>
                    </div>
                  </div> */}
                </div>
                <div className="block">
                  <div className="ml-4 flex items-center md:ml-6"></div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    className="text-gray-100  dark:text-white hover:text-yellow-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                    id="hamburger"
                    ref={this.hamburgerBtn}
                    onClick={this.handleHamburgerButton}
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
                          {this.state.user.rol_select}
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
                          <p className="text-sm text-center font-bold">Cambiar perfil</p>
                        </div>
  
                        {
                          this.state.roles.map(e =>
                          (
                            <Menu.Item key={shortid.generate()}>
                              {({ active }) => (
                                <div
                                  className={this.classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <button onClick={this.cambiarPerfil}>{e}</button>
                                </div>
                              )}
                            </Menu.Item>
                          ))
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
                              className={this.classNames(
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
                              className={this.classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <h2 className="text-sm font-bold text-center">  {this.state.user.lastname == null ? this.state.user.name : `${this.state.user.name} ${this.state.user.lastname}`}</h2>
                            </div>
                          )}
                        </Menu.Item>
  
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={this.classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <button onClick={this.logout}>Logout</button>
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
      );
    }
  }










