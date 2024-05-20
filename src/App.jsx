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
 
 const initialTodos = [
   { id: 1, listId: 1, text: "Prima Attività", done: false },
   { id: 7, listId: 1, text: "Prima Attività", done: false },
   { id: 8, listId: 1, text: "Prima Attività", done: true },
   { id: 2, listId: 1, text: "Seconda Attività", done: false },
   { id: 3, listId: 2, text: "Terza Attività", done: true },
   { id: 4, listId: 3, text: "Quarta Attività", done: true },
   { id: 5, listId: 4, text: "Quarta Attività", done: true },
   { id: 6, listId: 4, text: "Quarta Attività", done: true },
 ];
 
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
 
   // Funzione per creare un nuovo todo
   const handleCreateTodo = (text) => {
     // Funzione vuota, da implementare
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
   const handleListDelete = (id) => {
     // Funzione vuota, da implementare
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
     // Funzione vuota, da implementare
   };
 
   // Funzione per ottenere le liste dal server
   const getLists = async () => {

     const response = 
     fetch("http://127.0.0.1:8000/api/todolists")
     .then(response => response.json())
     .then(data => setTodoLists(data.data))
     .catch((error) => console.log(error))    
   };
 
   // Effetto per ottenere le liste al montaggio del componente
   useEffect(() => {
     getLists();
   }, []);
 
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
           todos={todos}
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
 