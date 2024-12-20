import React, {useState} from "react";
//create your first component
const Home = () => {
  const [tarea,setTarea] = useState ("");
  const [elementoLista,setElementoLista] = useState([]);
  //Añadir tarea a la lista
  const añadirTarea = (e) => {
    // console.log(event.target.type);
    if (e.key ==="Enter" && tarea.trim() !==""){
      setElementoLista([...elementoLista,tarea]); //[...,] Los 3 puntos añaden el elemento a la lista al pulsar enter
      setTarea("");
    }
  }
    //
  const hacerClick = (eliminarIndice) => {
    const newLi = elementoLista.filter ((__, linea) => linea !== eliminarIndice);//Método filter con el segúndo parámetro
       setElementoLista(newLi);
  };
  return (
    <div className="container d-flex flex-column mx-0 align-items-center mx-auto">
        <h1 className="Titulo py-3">Lista de tareas</h1>
        <div className="input-group w-50 m-0">
          <input
            type="text"
            className="form-control"
            placeholder="Añadir tarea aquí..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e)=> setTarea(e.target.value)}
            onKeyDown={añadirTarea}
            value={tarea}//Para que vuelva a quedarse en blanco al dar enter
          />
         </div>
        {elementoLista.map((element, linea) => {
          return (
            <ul className="list-group w-50 d-flex justify-content-between">
              <li className="list-group-item tarea-item d-flex justify-content-between " key={linea}>
                {element}
                <span className="delete-btn" onClick={() => hacerClick(linea)}><i className="fa-solid fa-xmark"></i></span>
              </li>
            </ul>
          );
        })}
        <div className="list-group d-flex justify-content-center w-50">
          <span className="list-group-item" id="tareas">{elementoLista.length} Pendientes.</span>
        </div>
    </div>
  )
  }
  export default Home