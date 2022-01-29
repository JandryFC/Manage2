import React from "react";
import plus from "../../assets/plus-solid.svg";
const CardPlus = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="my-3 space-x-3 ">
          <button className="  text-gray-800 font-bold py-2 px-9 ">
            <img src={plus} className="px-auto" width="50"/>
          </button>
          <h2 className="text-gray-800 font-bold">Agregar {props.tema}</h2>
        </div>
      </div>
    </div>
  );
};

export default CardPlus;
