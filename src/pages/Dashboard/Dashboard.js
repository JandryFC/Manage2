import React, { useState, useEffect } from "react";
import NavComponent from "../../components/NavComponent/NavComponent";
import Book from "../../components/Libros/Libro";
import CardPlus from "../../components/CardPlus/CardPlus";
import shortid from "shortid";
import {llenarInfo, numeroALetras} from '../../helpers/fuctions'
const API_URL = "http://localhost:5000/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";

const Dashboard = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const [userProgress, setuserProgress] = useState([]);
  const [cargando, setcargando] = useState(true);

  const getData = async() =>{
    let data = await llenarInfo(API_URL, USER._id);
    setuserProgress(await data);
    setcargando(false);
 }

  useEffect(async () => {
    getData()
    if (!USER) {
      window.location.href = '/';
    }
  }, []);

  //libros >> modulo >> unidad

  return (
    <div>
      <NavComponent data={USER} />
      {
        console.log(numeroALetras(55.4, {
          plural: 'dólares estadounidenses',
          singular: 'dólar estadounidense',
          centPlural: 'centavos',
          centSingular: 'centavo'
        }))
      }
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Libros</h2>
        </div>
        <div className="flex  justify-center space-x-2 my-4">
          {!cargando ? /*console.log(userProgress)  */
            userProgress.libros.map((e, i) => {
              return (
                <div className=" my-4" key={shortid.generate()}>
                  <Book book_number={i + 1} key={shortid.generate()} />
                </div>
              );
            })
            : <div>CARGANDO...</div>
          }
         {/*  <div className="my-auto">
            <CardPlus tema="Libro" />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
