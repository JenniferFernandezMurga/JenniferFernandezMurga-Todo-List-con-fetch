import React, { useState , useEffect} from "react";

const Home = () => {

	const [tarea,setTarea] = useState ("");
	const [elementoLista,setElementoLista] = useState([]);



   //Añadir tarea a la lista

    const añadirTarea = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			
			const raw = JSON.stringify({
			  "label": tarea,
			  "is_done": false
			});
			
			const requestOptions = {
			  method: "POST",
			  headers: myHeaders,
			  body: raw,
			  redirect: "follow"
			};
			
			fetch("https://playground.4geeks.com/todo/todos/Jey", requestOptions)
			.then((response) => {
				if(response.status === 201 ) {
				getTodoLista()
			}
			return response.json()
			})
			  .then((result) => console.log(result))
			  .catch((error) => console.error(error));
			setTarea("");
	}
  };

  //Eliminar tarea por ID

	const borrarTarea = (id) => {
	const requestOptions = {
		method: "DELETE",
		redirect: "follow"
	  };
	  
	fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
	.then((response) => {
		if(response.ok) {
		getTodoLista();
	}
	})
  	.catch((error) => console.error(error));
	};

	//Función para crear la tarea

	function getTodoLista(){
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		  };
		  
		  fetch("https://playground.4geeks.com/todo/users/Jey", requestOptions)
			.then((response) => {
				console.log(response);
				if(response.status === 404 ) {
				crearUsuario()
			}
			return response.json()
			})
			.then((data) => setElementoLista(data.todos))
			.catch((error) => console.error(error));
	}
	
	function crearUsuario(){
		const raw = "";
		const requestOptions = {
  		method: "POST",
  		body: raw,
  		redirect: "follow"
		};

	fetch("https://playground.4geeks.com/todo/users/Jey", requestOptions)
	.then((response) => {
		if(!response.ok) {
			getTodoLista()
		}
        return response.json()})
		then((result) => console.log(result))
  		.catch((error) => console.error(error));
	}


	// const createUser = async () => {
	// 	const requestOptions = {
	// 	  method: "POST",
	// 	  headers: {
	// 		"content-type": "application/json"
	// 	  },
	// 	  body: JSON.stringify([])
	// 	};
	// 	try {
	// 	  const response = await fetch("https://playground.4geeks.com/todo/users/Jey", requestOptions)
	// 	  if(!response.ok) {
	// 		throw new Error("error de solicitud")
	// 	  }
	// 	  const data = await response.json ();
	// 	  console.log("usuario creado", data)
	// 	}
	// 	  catch (err){
	// 	  console.error("error al obtener las tareas")
	// 	}
	// };
	  
	// const getTask = async () => {
	// 	const requestOptions = {
	// 	  method: "GET",
	// 	  redirect: "follow"
	// 	};
	// 	try {
	// 	  const response = await fetch("https://playground.4geeks.com/todo/users/Jey", requestOptions)
	// 	  if(!response.ok) {
	// 		createUser()
	// 		throw new Error("errores de solicitud")
	// 	  }
	// 	  const data = await response.json ();
	// 	  setListElement(data.todos)
	// 	}
	// 	catch (err){
	// 	  console.error("error al obtener las tareas")
	// 	}
	// };


  useEffect(()=>{
    getTodoLista()
  },[])

	return (
		<div className="container d-flex flex-column mx-0 align-items-center mx-auto">
			<h1 className="Titulo py-3">Todos</h1>
			<div className="input-group w-50 m-0">
			  <input
				type="text"
				className="form-control"
				placeholder="Añadir tarea aquí..."
				aria-label="Username"
				aria-describedby="basic-addon1"
				onChange={(e)=> setTarea(e.target.value)}
				onKeyDown={añadirTarea}
				value={tarea}
			  />
			 </div>
			 <ul className="list-group w-50 d-flex justify-content-between">
			{elementoLista.map((element) => {
			  return (
				<li className="list-group-item tarea-item d-flex justify-content-between " key={element.id}>
					{element.label}
					<span className="delete-btn" onClick={() => borrarTarea(element.id)}><i className="fa-solid fa-xmark"></i></span>
				  </li>
			  );
			})}
			</ul>
			<div className="list-group d-flex justify-content-center w-50">
			  <span className="list-group-item" id="tareas">{elementoLista.length} Pendientes.</span>
			</div>
		</div>
	);
}

export default Home;