import React from 'react';
import shortid from 'shortid';
import Activity from '../Activities/Activity';
import { ModuleProgress } from '../ModuleProgress';


const Modulo = (props) => {
    let completado = 0;
  return <div>
      <h2  key={shortid.generate()} className="text-2xl text-left text-green-600 mt-5 mx-10 font-bold">{`Module ${props.moduloindex}`}</h2>
      {props.modulo.map((modulo, index) => {
          let userprogress = (modulo.writing.user_progress + modulo.grammar.user_progress + modulo.reading.user_progress + modulo.vocabulary.user_progress);
          let total_task = (modulo.writing.total_task + modulo.grammar.total_task + modulo.reading.total_task + modulo.vocabulary.total_task);
          let progress = (userprogress / total_task) * 100;
        return (<div key={shortid.generate()} >
        <ModuleProgress
        key={shortid.generate()}
          moduleName={"Unit: " + modulo.book_info.unit}
          percent={parseInt(progress)}
        ></ModuleProgress>            
        <Activity
          rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/writing`}
          moduleName={`Module: ${modulo.book_info.module}`}
          ruta={`/modulo/${modulo.book_info.module}/writing/${modulo.book_info.unit}/${modulo.writing.task_id}`}
          taskid={modulo.writing.task_id}
          percent={parseInt(
            (modulo.writing.user_progress /
              modulo.writing.total_task) *
              100
          )}
          key={shortid.generate()}
          name={"writing"}
          img="img.png"
          bloqueo={props.bloqueo}
        />

        <Activity
          rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/vocabulary`}
          moduleName={`Module: ${modulo.book_info.module}`}
          ruta={`/modulo/${modulo.book_info.module}/vocabulary/${modulo.book_info.unit}/${modulo.vocabulary.task_id}`}
          taskid={modulo.vocabulary.task_id}
          percent={parseInt(
            (modulo.vocabulary.user_progress /
              modulo.vocabulary.total_task) *
              100
          )}
          key={shortid.generate()}
          name={"vocabulary"}
          img="img.png"
          bloqueo={props.bloqueo}
        />

        <Activity
          rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/reading`}
          moduleName={`Module: ${modulo.book_info.module}`}
          ruta={`/modulo/${modulo.book_info.module}/reading/${modulo.book_info.unit}/${modulo.reading.task_id}`}
          taskid={modulo.reading.task_id}
          percent={parseInt(
            (modulo.reading.user_progress /
              modulo.reading.total_task) *
              100
          )}
          key={shortid.generate()}
          name={"reading"}
          img="img.png"
          bloqueo={props.bloqueo}
        />

        <Activity
          rutaReview={`/review/${modulo.book_info.book}/${modulo.book_info.module}/${modulo.book_info.unit}/grammar`}
          moduleName={`Module: ${modulo.book_info.module}`}
          ruta={`/modulo/${modulo.book_info.module}/grammar/${modulo.book_info.unit}/${modulo.grammar.task_id}`}
          taskid={modulo.grammar.task_id}
          percent={parseInt(
            (modulo.grammar.user_progress /
              modulo.grammar.total_task) *
              100
          )}
          key={shortid.generate()}
          name={"grammar"}
          img="img.png"
          bloqueo={props.bloqueo}
        />

        </div>)
      })}
      
  </div>;
};

export default Modulo;
