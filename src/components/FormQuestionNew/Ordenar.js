import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import shortid from "shortid";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
/* import { mostrarExitoEditar } from '../../components/Alert/Alert' */

const Ordenar = (props) => {

    const [question, setQuestion] = useState({});
    var formData = new FormData()
    var navigate = useNavigate()

    const handleChange = async (e) => {

    }
    const handleForm = async (e) => {

    }
    
    const sortArray = (question)=>{
        let aux_question = question;
        aux_question.options[0] = aux_question.options[0].sort((a,b)=>  a.answer - b.answer )
        return aux_question;
    }

    useEffect(async () => {
        
        setQuestion(sortArray(props.question))
        console.log(question)
        formData.set("question", JSON.stringify(question))
    })
    return (
        <div className="w-full max-w-xl m-auto py-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <h2 className="block text-center text-yellow-500 text-2xl font-bold mb-2">
                        Editar pregunta
                    </h2>
                </div>
                <div className="mb-4">
                    <h2 className="block text-gray-700 text-md font-bold mb-2">
                        Tipo pregunta: <span className="text-md  font-normal">{question.type}</span>
                    </h2>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="question">
                        Pregunta:
                    </label>
                    <textarea id="question" name="question" onChange={handleChange} rows="4" className=" shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" defaultValue={question.question}>
                    </textarea>
                </div>
                <div className="mb-6">
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
                <div className="mb-4">
                    <DragDropContext onDragEnd={
                        (result) => {
                            const { source, destination } = result;
                            if (!destination) return;
                            if (source.index === destination.index
                                && source.droppableId === destination.droppableId) return;

                            console.log(result)
                            let aux_question = question;
                            aux_question.options[0][source.index].answer = destination.index+1;
                            setQuestion(sortArray(aux_question))
                            console.log(question)
                            

                        }
                    }>
                        <div className="overflow-auto h-52">

                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="respuesta">
                                Respuestas:
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
                                                question.options ? question.options[0].map((e, i) =>
                                                (
                                                    <Draggable key={shortid.generate()} draggableId={`item${i}`} index={i}>
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
                <div className="flex items-center justify-between">
                    <button onClick={handleForm} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Actualizar
                    </button>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>)
}

export default Ordenar;





/* question.options ? question.options[0].map((e, i) => {
    return (
        <div className=" mx-3 mb-6 " key={shortid.generate()}>
            <div className="w-1/3 px-3 ">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`respuesta${i + 1}`}>
                    Respuesta {i + 1}
                </label>
                <input name={`item${i}`} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={e.item} id={`respuesta${i + 1}`} type="text" placeholder="Respuesta"></input>
            </div>

        </div>
    );
}) : <div>Cargando</div> */