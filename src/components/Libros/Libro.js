import React from "react";
import shortid from "shortid";
import Modulo from "../Modulos/Modulo";

import "./Libro.css";

const Libro = (props) => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Libro {props.book_number}</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
        <div className="my-3 space-x-3">
          <button class="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full">
            Ver libro
          </button>
          <button class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full">
            Eliminar libro
          </button>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #grammar
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #reading
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #writting
        </span>
      </div>
    </div>
  );
};

export default Libro;
