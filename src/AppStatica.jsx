"use client";

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
import { useState, useEffect } from "react";
import store from "./store.js";
import { Provider } from "react-redux";
import { v4 as uuid } from "uuid";

library.add(faBars, faFilm, faBook, faBookmark, faTrash);

/****************************************************************************
 ****************************************************************************
                                COMPONENTS IMPORTS
*****************************************************************************
*****************************************************************************/
import Layout from "./layout.js";
import Image from "next/image";
import AppSidebar from "./components/AppSidebar.js";
import AppMain from "./components/AppMain.js";
import NoListView from "./components/NoListView.js";
import { list } from "postcss";

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

const initialLists = [
  { id: 1, name: "Importante", icon: faBookmark, undone_count: 3 },
  { id: 2, name: "Film da vedere", icon: faFilm, undone_count: 0 },
  { id: 3, name: "Libri da leggere", icon: faBook, undone_count: 0 },
  { id: 4, name: "Libri da leggeress", icon: faBook, undone_count: 0 },
];

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
export default function AppStatica() {
  // Dato della lista selezionata
  const [selectedList, setSelectedList] = useState(-1);
  // Dato delle liste
  const [allLists, setAllLists] = useState(initialLists);
  // Dato delle todos
  const [allTodos, setAllTodos] = useState(initialTodos);
  // Definisco i dati delle todos applicando subito il filtro
  const [filteredTodos, setFilteredTodos] = useState(
    allTodos.filter((t) => t.listId === selectedList)
  );

  // Effect che si attiva ogni volta che allTodos o selectedList cambia
  useEffect(() => {
    // Filtra i todos in base alla lista selezionata
    const filtered = allTodos.filter((todo) => todo.listId === selectedList);
    // Aggiorna lo stato delle todos filtrate
    setFilteredTodos(filtered);
  }, [allTodos, selectedList]);

  // Funzione di creazione di una nuova todo
  const handleCreateTodo = (text) => {
    const newTodo = {
      listId: selectedList,
      id: uuid(),
      done: false,
      text: text,
    };

    const tempLists = [...allLists];
    const listToUpdate = tempLists.find((list) => list.id === selectedList);

    if (listToUpdate) {
      listToUpdate.undone_count++;
      setAllLists(tempLists);
    } else {
      console.error("List with id:", selectedList, "not found.");
    }

    setAllTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Funzione che cambia il valore delle checkbox e modifica il count delle todo completate
  const handleUpdateTodo = (id, data) => {
    // Recupero l'indice della todo usando findIndex
    const todoIdx = allTodos.findIndex((t) => t.id === id);
    // Recupero l'oggetto usando l'indice
    const todoToUpdate = allTodos[todoIdx];

    // Definisco l'oggetto con lo spread operator
    const updateTodo = {
      ...todoToUpdate,
      ...data,
    };

    // Definisco un array temporaneo di todos
    const tempTodos = [...allTodos];
    // Sostituisco l'oggetto cambiato
    tempTodos[todoIdx] = updateTodo;
    // Aggiorno lo stato delle todos
    setAllTodos(tempTodos);

    // Recupero l'indice della lista selezionata
    const listIdx = getListIdx(selectedList);

    if (todoToUpdate.done !== updateTodo.done) {
      // Controllo sul valore della todo DOPO l'aggiornamento
      if (updateTodo.done) {
        addToListCount(listIdx, -1);
      } else {
        addToListCount(listIdx, +1);
      }
    }
  };

  // Funzione di eliminazione di una todo
  const handleTodoDelete = (id) => {
    // Recupero l'indice della todo usando findIndex
    const todoIdx = allTodos.findIndex((t) => t.id === id);
    // Recupero l'oggetto usando l'indice
    const todo = allTodos[todoIdx];

    // Definisco un array temporaneo di todos
    const tempTodos = [...allTodos];
    // Rimuovo dall'array l'elemento
    tempTodos.splice(todoIdx, 1);
    // Aggiorno lo stato delle todos
    setAllTodos(tempTodos);

    const listIdx = getListIdx(selectedList);
    addToListCount(listIdx, todo.done ? 0 : -1);
  };

  // Funzione di eliminazione di una lista
  const handleListDelete = (id) => {
    const listIdx = allLists.findIndex((l) => l.id === id);
    const tempLists = [...allLists];
    tempLists.splice(listIdx, 1);
    setAllLists(tempLists);
    setSelectedList(-1);
  };

  // Funzione di aggiornamento di una lista
  const handleListUpdate = (id, data) => {
    const listIdx = allLists.findIndex((l) => l.id === id);
    const listToUpdate = allLists[listIdx];
    const updateList = {
      ...listToUpdate,
      ...data,
    };
    const tempLists = [...allLists];
    tempLists[listIdx] = updateList;
    setAllLists(tempLists);
  };

  // Funzione di creazione di una nuova lista
  const handleCreateList = () => {
    const newList = {
      id: uuid(),
      name: "Lista nuova",
      icon: faBookmark,
      undone_count: 0,
    };

    setAllLists((prevList) => [...prevList, newList]);
  };

  // Aggiunge o sottrae al conteggio delle todo incomplete di una lista
  const addToListCount = (listIdx, num) => {
    // Definisco un array temporaneo che poi andrà a sostituire quello vecchio
    const tempLists = [...allLists];

    // Recupero la lista selezionata e aggiorno il valore di undone_count
    tempLists[listIdx] = { ...tempLists[listIdx] };
    tempLists[listIdx].undone_count += num;

    // Utilizzo il setter per cambiare il valore
    setAllLists(tempLists);
  };

  // Funzione che viene richiamata per effettuare il filtraggio delle todos
  const setTodosByListId = (listId) => {
    // Aggiorna il valore del dato
    setSelectedList(listId);

    // Aggiorna le todos corrette
    setFilteredTodos(allTodos.filter((t) => t.listId === listId));
  };

  // Funzione che ritorna il ListIdx dall' list id
  const getListIdx = (id) => {
    return allLists.findIndex((l) => l.id === selectedList);
  };

  return (
  
    <div className="flex">
      <AppSidebar
        user={user}
        lists={allLists}
        setTodosByListId={setTodosByListId}
        setSelectedList={setSelectedList}
        selectedList={selectedList}
        onCreateList={handleCreateList}
      />
      {selectedList === -1 ? (
        <NoListView />
      ) : (
        <AppMain
          lists={allLists}
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