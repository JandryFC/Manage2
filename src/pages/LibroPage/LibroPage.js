import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import Modulo from "../../components/Modulos/Modulo";
import shortid from "shortid";
import {
    useParams
} from "react-router-dom";
import {llenarInfo} from '../../helpers/fuctions'


const LibroPage = () => {
    let { book_number } = useParams();
    const USER = JSON.parse(localStorage.getItem("user"));
    const [Data_libro, setLibro] = useState([])
    const [cargando, setcargando] = useState(true);

    const getData = async() =>{
        let data = await llenarInfo(process.env.REACT_APP_API_URL, USER._id);
        let libro = data.libros[parseInt(book_number) - 1]
        setLibro(await libro);
        setcargando(false);
     }

    useEffect(async () => {
        getData();
        if (!USER) {
            window.location.href = '/';
        }
    }, []);
    return (<div>
        <NavComponent data={USER} />
        <div className="p-4">
            <div className="text-center">
                <h2 className="text-4xl font-bold">Modulos del Libro {book_number}</h2>
            </div>
            <div className="flex  flex-wrap justify-center space-x-4 my-4">
                {!cargando ? /*console.log(userProgress)  */
                        Data_libro.modulos.map((e, i) => {
                            return (
                                <div className="my-4" key={shortid.generate()}>
                                    <Modulo book_number={book_number} modulo_number={i + 1} key={shortid.generate()} />
                                </div>
                            );
                        })
                    : <div>CARGANDO...</div>
                }
               {/*  <div className="my-auto">
                    <CardPlus tema="Modulo" />
                </div> */}
            </div>
        </div>
    </div>)
}

export default LibroPage;