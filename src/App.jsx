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
 
 const user = {
   name: "Giuseppe",
   age: 20,
   image: 'https://avatars.githubusercontent.com/u/144452692?s=96&v=4',
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
   // Stato per le todo filtrate
   const [filteredTodos, setFilteredTodos] = useState([]);
 
   // Funzione per ottenere le liste dal server
   const getLists = async () => {
     try {
       const response = await fetch("http://127.0.0.1:8000/api/todolists");
       const data = await response.json();
       setTodoLists(data.data);
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per ottenere i todo dal server
   const getTodos = async () => {
     try {
       const response = await fetch("http://127.0.0.1:8000/api/todos");
       const data = await response.json();
       setTodos(data.data);
     } catch (error) {
       console.error(error);
     }
   };
 
   // Effetto per ottenere le liste e i todo al montaggio del componente
   useEffect(() => {
     getLists();
     getTodos();
   }, []);
 
   // Effetto per filtrare i todo in base alla lista selezionata
   useEffect(() => {
     const filtered = todos.filter((todo) => todo.todo_list_id === selectedList);
     setFilteredTodos(filtered);
   }, [selectedList, todos]);
 
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
     };
 
     try {
       await fetch("http://127.0.0.1:8000/api/add/todo", options);
       getTodos();
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per aggiornare un todo
   const handleUpdateTodo = async (data) => {
     const options = {
       method: "POST",
       body: JSON.stringify({data}),
       headers: {
         "Content-type": "application/json; charset=UTF-8",
       },
     };
 
     try {
       await fetch("http://127.0.0.1:8000/api/update/todo", options);
       getTodos();
       getLists();
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per aggiornare una lista
   const handleListUpdate = async (data) => {
     const options = {
       method: "POST",
       body: JSON.stringify({data}),
       headers: {
         "Content-type": "application/json; charset=UTF-8",
       },
     };
 
     try {
       await fetch("http://127.0.0.1:8000/api/update/list", options);
       getLists();
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per eliminare un todo
   const handleTodoDelete = async (id) => {
     const options = {
       method: "POST",
       body: JSON.stringify({ id }),
       headers: {
         "Content-type": "application/json; charset=UTF-8",
       },
     };
 
     try {
       await fetch("http://127.0.0.1:8000/api/delete/todo", options);
       getTodos();
       getLists();
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per eliminare una lista
   const handleListDelete = async (id) => {
     const options = {
       method: "POST",
       body: JSON.stringify({ id }),
       headers: {
         "Content-type": "application/json; charset=UTF-8",
       },
     };
 
     try {
       await fetch("http://127.0.0.1:8000/api/delete/list", options);
       setSelectedList(-1);
       getLists();
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per creare una nuova lista
   const handleCreateList = async () => {
     const options = {
       method: "POST",
       body: JSON.stringify({ name: "Nuovo Elenco" }),
       headers: {
         "Content-type": "application/json; charset=UTF-8",
       },
     };
 
     try {
       await fetch("http://127.0.0.1:8000/api/add/list", options);
       getLists();
     } catch (error) {
       console.error(error);
     }
   };
 
   // Funzione per impostare i todo in base all'ID della lista
   const setTodosByListId = (listId) => {
     setSelectedList(listId);
     setFilteredTodos(todos.filter((t) => t.todo_list_id === listId));
   };
 
   return (
     <div className="flex">
       <AppSidebar
         user={user}
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
 