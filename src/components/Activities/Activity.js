import "./Activity.css";

import { useEffect, useRef} from "react";
import { getProgressColor } from "../../helpers/indexFuntions";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";


export default function Activity(props) {
  

  let circlePercent = useRef();
  let bcirclePercent = useRef();

  useEffect(
    (e) => {
      if(circlePercent.current){
        circlePercent.current.style.height = `${props.percent}%`;
        circlePercent.current.style.backgroundColor = getProgressColor(
          props.percent
        );
  
      }      
    },
    [props.percent]
  );

  return (
    <Menu
      as="div"
      className={`relative inline-block tooltip`}
      ref={props.myref}
    >
      <div>
        <Menu.Button  disabled={props.bloqueo}  className="inline-flex justify-center w-full  px-4 py-2 bg-red text-sm font-medium text-gray-700" /*disabled={props.percent===100?true:false}*/>
          <div
            className={props.percent !== 100?props.bloqueo?"bcircle":"circle":"circle"}
          >
            <div className="bfill" ref={props.bloqueo?bcirclePercent:circlePercent}></div>
            <img
              src={props.img}
              alt="ActivityName"
              className="activity-img"
            ></img>
          </div>
        </Menu.Button>
      </div>
      <div className="circle-text">
        <h2 className="text-base font-bold capitalize">{props.name}</h2>
        <span className={`${props.bloqueo?'tooltiptext':'hidden'}`}>Activity blocked, must complete previous modules</span>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items  className="origin-center absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
           {/*  <div className="p-2 text-left">
              <h2 className="text-lg mx-2 font-bold text-gray-900">
                Completed: {props.percent}% 
              </h2>
              <h2 className="text-sm mx-2 font-bold text-gray-500">
                {props.percent === 100?"activities completed":"Do activities"}
              </h2>
            </div> */}

          
            <Menu.Item  className={props.percent === 100?"bg-yellow-500 w-3/4 my-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded":"bg-green-600 w-3/4 my-2 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"}  >
              {({ active }) => (
                <button >
                  <a className="block"
                    href={props.percent === 100?props.rutaReview:props.ruta} 
                   /*  className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )} */
                  >
                     {props.percent === 100?"review":"start"}
                  </a>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    
 
  );
}
