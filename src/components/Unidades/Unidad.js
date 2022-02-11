import React from 'react';


const Unidad = (props) => {

  return (<div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">Unidad {props.unidad_number}</div>
      <p className="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
        nihil.
      </p>
      <div className="my-3 space-x-3">
        <a href={`/dashboard/book/${props.book_number}/module/${props.modulo_number}/unit/${props.unidad_number}`}>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full">
            Ver Unidad
          </button>
        </a>
       {/*  <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full">
          Eliminar Unidad
        </button> */}
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
  </div>);
};

export default Unidad;
