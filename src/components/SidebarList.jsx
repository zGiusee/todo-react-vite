/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faFilm,
  faBook,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faBars, faFilm, faBook, faBookmark);

/**************************************************************************** 
 ****************************************************************************
                            SIDEBAR LIST & COMPONENTS 
*****************************************************************************
*****************************************************************************/

export default function SidebarList({
  lists,
  setTodosByListId,
  setSelectedList,
  selectedList,
}) {
  // DEFINISCO LO STATO DELLA FUNZIONE

  // * FORMO LA ARROW FUNCTION CON LE FUNZIONI PASSATE DA PAGE.JS
  const changeListAndTodos = (listId) => {
    // Cambia il valore della lista selezionata
    setSelectedList(listId);
    // Richiamo della funzione definita in page.js
    setTodosByListId(listId);
  };

  
  return (
    // Ciclo le liste passate tramite le prop
    <ul className="mx-5 my-3">
      {lists.map((elem) => (
        <ListLink
          // Richiamo della funzione per modificare i dati in base alla lista
          onClick={() => changeListAndTodos(elem.id)}
          key={elem.id}
          linkName={elem.name}
          icon={faBookmark}
          count={elem.undone_count}
          isActive={elem.id === selectedList}
        />
      ))}
    </ul>
  );
}

function ListLink(props) {
  const listedClasses = `${
    props.isActive ? "my-active" : ""
  } p-4 flex items-center cursor-pointer justify-between`;

  return (
    <li onClick={props.onClick} className={listedClasses}>
      <div>
        <FontAwesomeIcon icon={props.icon} className="text-sm " />{" "}
        <span className="ms-2 text-sm ">{props.linkName}</span>{" "}
      </div>
      <div>
        <span className="ms-1 text-end text-sm ">({props.count})</span>
      </div>
    </li>
  );
}
