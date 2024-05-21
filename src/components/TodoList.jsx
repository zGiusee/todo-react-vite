/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { useState } from "react";
import { library, text } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faTrash);

/**************************************************************************** 
 ****************************************************************************
                                COMPONENTS IMPORTS
*****************************************************************************
*****************************************************************************/

import TodoItem from "./TodoItem";
import TodoCreator from "./TodoCreator";
import DeleteButton from "./input_components/DeleteButton";
import DeleteModal from "./modals/DeleteModal";
import ListTitle from "./input_components/ListTitle";

/**************************************************************************** 
 ****************************************************************************
                        TODO AND TODO COMPONENTS 
*****************************************************************************
*****************************************************************************/

export default function TodoList({
  todos,
  onCreate,
  onTodoUpdate,
  onTodoDelete,
  lists,
  selectedList,
  onListDelete,
  onListUpdate,
}) {
  const nonCompletedTodos = todos.filter((t) => t.done === 0);
  const completedTodos = todos.filter((t) => t.done === 1);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const completedCointainerClasses = `${
    nonCompletedTodos.length > 0 ? "mt-12" : ""
  } mb-10`;
  return (
    <div className="h-screen overflow-auto">
      {/* CONTAINER DELLA LISTA */}
      {lists
        .filter((l) => l.id === selectedList)
        .map((filterList) => (
          <div
            className="flex my-8 justify-between items-center"
            key={filterList.id}
          >
            <ListTitle
              onChange={(name) => onListUpdate( {id: filterList.id, name: name })}
              text={filterList.name}
            />
            <div className="mx-5">
              <div className="me-2">
                <DeleteButton iconClass="text-3xl" btnClass="mx-2 rounded-lg my-btn-title-delete " onClick={() => setDeleteModalState(true)} />
                {deleteModalState && (
                  <DeleteModal
                    type="list"
                    text={filterList.name}
                    onDelete={() => onListDelete(filterList.id)}
                    onCancel={() => setDeleteModalState(false)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

      {/* HR divisore sezione Titolo della lista/Todos */}
      <hr className="h-px mx-auto bg-gray-100 border-0 md:my-10 dark:bg-gray-300" />

      <div className="flex flex-col justify-between task-container">
        <div className="mt-5 px-10 overflow-auto">

          {/* CONTAINER DELLE TODO COMPLETATE */}
          <div>
            {nonCompletedTodos.length > 0 ? (
              <div>
                <h3 className="text-2xl">Attività da completare</h3>
                {nonCompletedTodos.map((t) => (
                  <TodoItem
                    key={t.id}
                    id={t.id}
                    text={t.text}
                    done={t.done}
                    onTodoUpdate={onTodoUpdate}
                    onTodoDelete={onTodoDelete}
                  />
                ))}
                <hr className="h-px mx-auto bg-gray-100 border-0 md:mt-10 dark:bg-gray-300" />
              </div>
            ) : (
              <></>
            )}
            <ul></ul>
          </div>

          {/* CONTAINER DELLE TODO COMPLETATE */}
          <div className={completedCointainerClasses}>
            <div>
              {completedTodos.length > 0 ? (
                <div>
                  <h3 className="text-2xl">Attività completate</h3>
                  {completedTodos.map((t) => (
                    <TodoItem
                      key={t.id}
                      id={t.id}
                      text={t.text}
                      done={t.done}
                      onTodoUpdate={onTodoUpdate}
                      onTodoDelete={onTodoDelete}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

        </div>

        
        <div className="">
          <TodoCreator onCreate={onCreate} />
        </div>

      </div>
    </div>
  );
}
