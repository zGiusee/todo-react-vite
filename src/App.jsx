/****************************************************************************
 ****************************************************************************
 GENERAL IMPORTS
 *****************************************************************************
 *****************************************************************************/

 import { library } from "@fortawesome/fontawesome-svg-core";
 import {
   faBars,
   faFilm,
   faBook,
   faBookmark,
   faTrash,
 } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import "@fortawesome/fontawesome-svg-core/styles.css";
 library.add(faBars, faFilm, faBook, faBookmark, faTrash);
 
 import { useState, useEffect } from "react";
 import reactLogo from './assets/react.svg';
 import viteLogo from '/vite.svg';
 
 /****************************************************************************
  ****************************************************************************
  COMPONENTS IMPORTS
  *****************************************************************************
  *****************************************************************************/
 
 import './App.css';
 import AppSidebar from "./components/AppSidebar.jsx";
 import AppMain from "./components/AppMain.jsx";
 import NoListView from "./components/NoListView.jsx";
 
 /****************************************************************************
  ****************************************************************************
                         DYNAMIC DATA AND APP DEPLOY
 *****************************************************************************
 *****************************************************************************/
 
 const user = {
   name: "Giuseppe",
   age: 20,
   image: null,
   id: 1,
 };
 
 /****************************************************************************
  ****************************************************************************
                  RENDER FINALE DELLA PAGINA
 *****************************************************************************
 *****************************************************************************/
 
 function App() {
   // Stato per la lista selezionata
   const [selectedList, setSelectedList] = useState(-1);
   // Stato per le liste
   const [todoLists, setTodoLists] = useState([]);
   // Stato per i todo
   const [todos, setTodos] = useState([]);
   // Stato per l'utente
   const [currentUser, setCurrentUser] = useState([]);

   const [filteredTodos, setFilteredTodos] = useState([]);
 

  // Funzione per ottenere le liste dal server
  const getLists = async () => {
    const response = 
    fetch("http://127.0.0.1:8000/api/todolists")
    .then(response => response.json())
    .then(data => setTodoLists(data.data))
    .catch((error) => console.log(error))    
  };

  const getTodos = async () =>{
  const response = 
  fetch("http://127.0.0.1:8000/api/todos")
  .then(response => response.json())
  .then(data => setTodos(data.data))
  .catch((error) => console.log(error))   
  };

  console.log(todos);
  console.log(filteredTodos);
  // Effetto per ottenere le liste al montaggio del componente
  useEffect(() => {
    getLists();
    getTodos()
  }, []);

  useEffect(() => {
  const filtered = todos.filter((todo) => todo.todo_list_id === selectedList);
  // Aggiorna lo stato delle todos filtrate
  setFilteredTodos(filtered);
  }, [selectedList, todos]);

  useEffect(() =>{

  })


   // Funzione per creare un nuovo todo
   const handleCreateTodo = async (text) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        todo_list_id: selectedList,
        text: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }

     const response = await fetch("http://127.0.0.1:8000/api/add/todo", options)
     .then(response => response.json())
     .then(data => {
      console.log(data);
      getTodos()
     })
     .catch(error => console.error(error))
   };
 
   // Funzione per aggiornare un todo
   const handleUpdateTodo = (id, data) => {
     // Funzione vuota, da implementare
   };
 
   // Funzione per eliminare un todo
   const handleTodoDelete = (id) => {
     // Funzione vuota, da implementare
   };
 
   // Funzione per eliminare una lista
   const handleListDelete = async (id) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }

    
     const response = await fetch(`http://127.0.0.1:8000/api/delete/list/${id}`, options)
     .then(response => response.json())
     .then(data => {
      console.log(data);
     })
     .catch(error => console.error(error))

     setSelectedList(-1)
     getLists()
   };
 
   // Funzione per aggiornare una lista
   const handleListUpdate = (id, data) => {
     // Funzione vuota, da implementare
   };
 
   // Funzione per creare una nuova lista
   const handleCreateList = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        name: "Nuovo Elenco",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }

     const response = await fetch("http://127.0.0.1:8000/api/add/list", options)
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error))
     
    getLists()
   };
 
   // Funzione per aggiornare i contatori delle liste
   const addToListCount = (listIdx, num) => {
     // Funzione vuota, da implementare
   };
 
   // Funzione per impostare i todo in base all'ID della lista
   const setTodosByListId = (listId) => {
  
    setSelectedList(listId);
    setFilteredTodos(todos.filter((t) => t.todo_list_id === listId))
   };
 

   return (
     <div className="flex">
       <AppSidebar
         user={currentUser}
         lists={todoLists}
         setTodosByListId={setTodosByListId}
         setSelectedList={setSelectedList}
         selectedList={selectedList}
         onCreateList={handleCreateList}
       />
       {selectedList === -1 ? (
         <NoListView />
       ) : (
         <AppMain
           lists={todoLists}
           selectedList={selectedList}
           todos={filteredTodos}
           onTodoUpdate={handleUpdateTodo}
           onTodoDelete={handleTodoDelete}
           onCreate={handleCreateTodo}
           onListDelete={handleListDelete}
           onListUpdate={handleListUpdate}
         />
       )}
     </div>
   );
 }
 
 export default App;
 