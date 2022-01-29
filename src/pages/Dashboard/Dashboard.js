import React, { useState, useEffect } from "react";
import axios from "axios";
import NavComponent from "../../components/NavComponent/NavComponent";
import Book from "../../components/Libros/Libro";
import CardPlus from "../../components/CardPlus/CardPlus";
import shortid from "shortid";
const API_URL = "http://localhost:5000/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";

const Dashboard = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const [userProgress, setuserProgress] = useState([]);
  const [cargando, setcargando] = useState(true);
  const [libros, setlibros] = useState([]);
  let libroActual = 1;
  let totalLibro = 2;

  const getData = async () => {
    const response = await fetch(`${API_URL}user_progress/${USER._id}`, {
      method: "POST",
      /* headers: {
        token: API_KEY,
      }, */
    });
    const data = await response.json();

    return data;
  };
  const llenarInfo = async () =>{
    let userInfo = await getData();
      console.log(userInfo)
      if (
        userInfo.name === "JsonWebTokenError"  ||
        userInfo.name === "TokenExpiredError" 
      ) {
        window.location.href = "./";
      }

      for (let i = 0; i < userInfo.length - 1; i++) {
        for (let j = 0; j < userInfo.length - i - 1; j++) {
          if (
            parseInt(
              "" + userInfo[j].book_info.module + userInfo[j].book_info.unit
            ) >
            parseInt(
              "" +
                userInfo[j + 1].book_info.module +
                userInfo[j + 1].book_info.unit
            )
          ) {
            let aux = userInfo[j];
            userInfo[j] = userInfo[j + 1];
            userInfo[j + 1] = aux;
          }
        }
      }

      let mergeBooks = { libros: [] };
      while (libroActual <= totalLibro) {
        let librox = userInfo.filter(
          (book) => book.book_info.book === libroActual
        );
        let contador = 1;
        //total de modulos
        let startedmodulo = librox[0].book_info.module;
        let contador2 = startedmodulo;
        let modulos = [];
        let progresototal = 0;
        let totalprogress = 0;
        while (contador <= 2) {
          let modulo = librox.filter(
            (book) => book.book_info.module === contador2
          );
          contador2++;
          contador++;
          modulos.push(modulo);
        }
        mergeBooks.libros.push(modulos);
        libroActual++;
      }

      let contadormodulos = 0;
      mergeBooks.libros.forEach((libro, index) => {
        let totaluserprogress = 0;
        let totaltask = 0;
        let totalmoduleprogress = 0;
        libro.forEach((modulo) => {
          modulo.forEach((unit) => {
            totaluserprogress =
              totaluserprogress +
              (unit.grammar.user_progress +
                unit.reading.user_progress +
                unit.vocabulary.user_progress +
                unit.writing.user_progress);
            totaltask =
              totaltask +
              (unit.grammar.total_task +
                unit.reading.total_task +
                unit.vocabulary.total_task +
                unit.writing.total_task);
          });
        });
        mergeBooks.libros[index] = {
          userprogress: totaluserprogress,
          totaltask: totaltask,
          modulos: mergeBooks.libros[index],
        };
      });

      setuserProgress(await mergeBooks);
      console.log(userProgress)
      localStorage.setItem('struct', JSON.stringify(userProgress));
      setcargando(false);

  }

  useEffect(async () => {
    llenarInfo();
    if(!USER){
      window.location.href = '/';
    }
  }, []);

  //libros >> modulo >> unidad

  return (
    <div>
      <NavComponent data={USER} />
      <div className="p-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Libros</h2>
        </div>
        <div className="flex  flex-wrap justify-center space-x-4 my-4">
          {!cargando? /*console.log(userProgress)  */ 
          <div>
          {userProgress.libros.map((e, i) => {
            return (
              <div className="my-4" key={shortid.generate()}>
                <Book book_number={i + 1} key={shortid.generate()}/>
              </div>
            );
          }) }
          </div>
          :<div>CARGANDO...</div>
          } 
        
          
          <div className="my-auto">
            <CardPlus tema="Libro"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
