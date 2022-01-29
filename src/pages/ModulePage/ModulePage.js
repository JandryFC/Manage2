import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import CardPlus from "../../components/CardPlus/CardPlus";
import Modulo from "../../components/Modulos/Modulo";
import shortid from "shortid";
import {
    useParams
} from "react-router-dom";
import Unidad from "../../components/Unidades/Unidad";

const UnidadPage = () => {
    let { book_number, module_number } = useParams();
    const USER = JSON.parse(localStorage.getItem("user"));
    const module_data = JSON.parse(localStorage.getItem('struct')).libros[parseInt(book_number) - 1].modulos[module_number-1]

    const [cargando, setcargando] = useState(false);

    useEffect(async () => {
        if (!USER) {
            window.location.href = '/';
        }
    }, []);
    return (<div>
        <NavComponent data={USER} />
        <div className="p-4">
            <div className="text-center">
                <h2 className="text-4xl font-bold">Unidades del modulo {module_number} del Libro {book_number}</h2>
            </div>
            <div className="flex  flex-wrap justify-center space-x-4 my-4">
                {!cargando ? /*console.log(userProgress)  */
                    <div>
                        {module_data.map((e, i) => {
                            return (
                                <div className="my-4" key={shortid.generate()}>
                                    <Unidad modulo_number={module_number} book_number={book_number} unidad_number={i+1} key={shortid.generate()} />
                                </div>
                            );
                        })}
                    </div>
                    : <div>CARGANDO...</div>
                }


                <div className="my-auto">
                    <CardPlus tema="Unidad"/>
                </div>
            </div>
        </div>
    </div>)
}

export default UnidadPage;