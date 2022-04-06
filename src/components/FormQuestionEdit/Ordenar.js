import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
/* import { mostrarExitoEditar } from '../../components/Alert/Alert' */

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Ordenar = (props) => {

    const [question, setQuestion] = useState(props.question);
    var formData = new FormData()
    var navigate = useNavigate()
    const [items, setItems] = useState([]);

    const handleChange = async (e) => {

    }

    useEffect(() => {
        let i = props.question.options.map(e => e.sort((a, b) => a.answer - b.answer))
        setItems((items) => [...i]);

    }, [])
    const handleForm = async (e) => {
        console.log(items)

    }
    const reorder = (list, startIndex, endIndex, index) => {
        const result = [...list];
        const [removed] = result[index].splice(startIndex, 1);
        result[index].splice(endIndex, 0, removed);
        //result[index].map((element, i) => { return { item: element.item, answer: i + 1 } })
        return result
    };

    return (
        <div className="grid grid-col-2 ml-60">
            <div className="w-full max-w-xl m-auto  py-3">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4">
                    <div className="mb-4">
                        <h2 className="block uppercase text-center text-yellow-500 text-xl font-bold mb-2">
                            Editar pregunta
                        </h2>
                    </div>
                    <div className="overflow-y-auto h-95">
                        <div className="mb-2 ">
                            <h2 className="block text-gray-700 text-md font-bold mb-2">
                                Tipo pregunta: <span className="text-md  font-normal">{question.type}</span>
                            </h2>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="question">
                                Pregunta:
                            </label>
                            <textarea id="question" name="question" onChange={handleChange} rows="4" className=" shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.question}>
                            </textarea>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="imagen">
                                Imagen:
                                {!question.img ?
                                    <span className="text-md  font-normal"> No existe imagen</span>
                                    : <a target="_blank" className="font-normal text-yellow-500" href={`https://drive.google.com/file/d/${question.img}/view`}>
                                        Ver Imagen
                                    </a>}
                            </label>
                            <input onChange={handleChange} name="img" accept="image/*" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="imagen"></input>
                        </div>
                        {items ? items.map((listas, i) => (
                            <div className="container  lg:m-auto lg:p-auto lg:w-auto lg:w-full  " key={shortid.generate()}>
                                <DragDropContext key={shortid.generate()} onDragEnd={
                                    (result) => {
                                        const { source, destination } = result;
                                        if (!destination) return;
                                        if (source.index === destination.index
                                            && source.droppableId === destination.droppableId) return;
                                        setItems(reorder(items, source.index, destination.index, i));
                                    }
                                }>
                                    <div className="overflow-auto h-32">
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                                            Items {i + 1}:
                                        </label>
                                        <Droppable droppableId="items" direction="horizontal">
                                            {
                                                (droppableProvided) => (
                                                    <div
                                                        ref={droppableProvided.innerRef}
                                                        {...droppableProvided.droppableProps}
                                                        className="w-full flex flex-cols"
                                                    >
                                                        {
                                                            listas ? listas.map((e, index) =>
                                                            (
                                                                <Draggable key={e.answer} draggableId={e.answer.toString()} index={index}>
                                                                    {
                                                                        (draggableProvided) => (
                                                                            <div className=" w-1/5 mx-3 mb-6 bg-yellow-400 hover:bg-yellow-300 p-3 rounded text-white"
                                                                                {...draggableProvided.draggableProps}
                                                                                ref={draggableProvided.innerRef}
                                                                                {...draggableProvided.dragHandleProps}
                                                                            >
                                                                                {e.item}
                                                                            </div>
                                                                        )
                                                                    }
                                                                </Draggable>
                                                            )
                                                            ) : <div>Cargando</div>
                                                        }{droppableProvided.placeholder}
                                                    </div>
                                                )
                                            }
                                        </Droppable>
                                    </div>
                                </DragDropContext>
                            </div>
                        )) : <div>Sin elements</div>}
                    </div>
                    <div className="flex py-2 items-center justify-between">
                        <button onClick={handleForm} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Actualizar
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Ordenar;
