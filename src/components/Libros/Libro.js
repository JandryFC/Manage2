import React from "react";
import shortid from "shortid";
import Modulo from "../Modulos/Modulo";

import "./Libro.css";

const Libro = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Libro {props.book_number}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
        <div classNameName="my-3 space-x-3">
          <a href={`/dashboard/book/${props.book_number}`}>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full">
              Ver libro
            </button>
          </a>
          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full">
            Eliminar libro
          </button>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #grammar
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #reading
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #writting
        </span>
      </div>
    </div>
  );
};

export default Libro;
