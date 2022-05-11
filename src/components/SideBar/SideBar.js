import react from 'react';
import './estilos.scss'
const SideBar = () => {
    return (
        <div className="layout has-sidebar fixed-sidebar fixed-header">
            <aside id="sidebar" className="sidebar break-point-lg has-bg-image">
                <div className="image-wrapper">
                    <img src="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg" alt="sidebar background" />
                </div>
                <div className="sidebar-layout">
                    <div className="sidebar-header">
                        <span style={{ "textTransform": "uppercase", "ffontSize": "15px", "letterSpacing": "3px", "fontWeight": "bold" }} >Pro Sidebar</span>
                    </div>
                    <div className="sidebar-content">
                        <nav className="menu open-current-submenu">
                            <ul>
                                <li className="menu-item sub-menu">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-vip-diamond-fill"></i>
                                        </span>
                                        <span className="menu-title">Components</span>
                                        <span className="menu-suffix">&#x1F525;</span>
                                    </a>
                                    <div className="sub-menu-list">
                                        <ul>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Grid</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Layout</span>
                                                </a>
                                            </li>
                                            <li className="menu-item sub-menu">
                                                <a href="#">
                                                    <span className="menu-title">Forms</span>
                                                </a>
                                                <div className="sub-menu-list">
                                                    <ul>
                                                        <li className="menu-item">
                                                            <a href="#">
                                                                <span className="menu-title">Input</span>
                                                            </a>
                                                        </li>
                                                        <li className="menu-item">
                                                            <a href="#">
                                                                <span className="menu-title">Select</span>
                                                            </a>
                                                        </li>
                                                        <li className="menu-item sub-menu">
                                                            <a href="#">
                                                                <span className="menu-title">More</span>
                                                            </a>
                                                            <div className="sub-menu-list">
                                                                <ul>
                                                                    <li className="menu-item">
                                                                        <a href="#">
                                                                            <span className="menu-title">CheckBox</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="menu-item">
                                                                        <a href="#">
                                                                            <span className="menu-title">Radio</span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="menu-item sub-menu">
                                                                        <a href="#">
                                                                            <span className="menu-title">Want more ?</span>
                                                                            <span className="menu-suffix">&#x1F914;</span>
                                                                        </a>
                                                                        <div className="sub-menu-list">
                                                                            <ul>
                                                                                <li className="menu-item">
                                                                                    <a href="#">
                                                                                        <span className="menu-prefix">&#127881;</span>
                                                                                        <span className="menu-title">You made it </span>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-item sub-menu">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-bar-chart-2-fill"></i>
                                        </span>
                                        <span className="menu-title">Charts</span>
                                    </a>
                                    <div className="sub-menu-list">
                                        <ul>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Pie chart</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Line chart</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Bar chart</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-item sub-menu">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-shopping-cart-fill"></i>
                                        </span>
                                        <span className="menu-title">E-commerce</span>
                                    </a>
                                    <div className="sub-menu-list">
                                        <ul>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Products</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Orders</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">credit card</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-item sub-menu">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-global-fill"></i>
                                        </span>
                                        <span className="menu-title">Maps</span>
                                    </a>
                                    <div className="sub-menu-list">
                                        <ul>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Google maps</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Open street map</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-item sub-menu">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-brush-3-fill"></i>
                                        </span>
                                        <span className="menu-title">Theme</span>
                                    </a>
                                    <div className="sub-menu-list">
                                        <ul>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Dark</span>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#">
                                                    <span className="menu-title">Light</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="menu-item">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-book-2-fill"></i>
                                        </span>
                                        <span className="menu-title">Documentation</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-calendar-fill"></i>
                                        </span>
                                        <span className="menu-title">Calendar</span>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">
                                        <span className="menu-icon">
                                            <i className="ri-service-fill"></i>
                                        </span>
                                        <span className="menu-title">Examples</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="sidebar-footer"><span>Sidebar footer</span></div>
                </div>
            </aside>
            <div id="overlay" className="overlay"></div>
            <div className="layout">
                <header className="header">
                    <a id="btn-collapse" href="#">
                        <i className="ri-menu-line ri-xl"></i>
                    </a>
                    <a id="btn-toggle" href="#" className="sidebar-toggler break-point-lg">
                        <i className="ri-menu-line ri-xl"></i>
                    </a>
                </header>
                <main className="content">
                    <div>
                        <h1>Pro Sidebar</h1>
                        <p>
                            Responsive layout with advanced sidebar menu built with SCSS and vanilla Javascript
                        </p>
                        <p>
                            Full Code and documentation available on  <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">Github</a>
                        </p>
                        <div>
                            <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">
                                <img alt="GitHub stars" src="https://img.shields.io/github/stars/azouaoui-med/pro-sidebar-template?style=social" />
                            </a>
                            <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">
                                <img alt="GitHub forks" src="https://img.shields.io/github/forks/azouaoui-med/pro-sidebar-template?style=social" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2>Features</h2>
                        <ul>
                            <li>Fully responsive</li>
                            <li>Collapsable sidebar</li>
                            <li>Multi level menu</li>
                            <li>RTL support</li>
                            <li>Customizable</li>
                        </ul>
                    </div>
                    <div>
                        <h2>Resources</h2>
                        <ul>
                            <li>
                                <a target="_blank" href="https://github.com/azouaoui-med/css-pro-layout">
                                    Css Pro Layout</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://github.com/popperjs/popper-core"> Popper Core</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://remixicon.com/"> Remix Icons</a>
                            </li>
                        </ul>
                    </div>
                    <footer className="footer">
                        <small style={{ "marginBottom": "20px", "display": "inlineBlock" }}>
                            © 2022 made with
                            <span style={{ "color": "red", "fontSize": "18px" }}>&#10084;</span> by -
                            <a target="_blank" href="https://azouaoui.netlify.com"> Mohamed Azouaoui </a>
                        </small>
                        <br />
                        <div>
                            <a href="https://github.com/azouaoui-med" target="_blank" rel="noopener noreferrer">
                                <img alt="GitHub followers" src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social" />
                            </a>
                            <a href="https://twitter.com/azouaoui_med" target="_blank" rel="noopener noreferrer">
                                <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social" />
                            </a>
                        </div>
                    </footer>
                </main>
                <div className="overlay"></div>
            </div>
        </div>
    )
}

export default SideBar;