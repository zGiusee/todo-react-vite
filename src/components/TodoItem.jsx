/**************************************************************************** 
 ****************************************************************************
                            GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { useState } from "react";

/**************************************************************************** 
 ****************************************************************************
                                COMPONENT IMPORTS
*****************************************************************************
*****************************************************************************/

import StatutsCheckbox from "./input_components/StatusCheckbox";
import DeleteButton from "./input_components/DeleteButton";
import TodoText from "./input_components/TodoText";
import DeleteModal from "./modals/DeleteModal";

/**************************************************************************** 
 ****************************************************************************
                                TODO ITEM
*****************************************************************************
*****************************************************************************/

export default function TodoItem({
  id,
  text,
  done,
  onTodoUpdate,
  onTodoDelete,
}) {
  const [deleteModalState, setDeleteModalState] = useState(false);

  return (
    <li className="p-2 todo-item mt-4 flex justify-between rounded-lg border border-gray-300">
      {/* CHECK BOX AND TASK NAME */}
      <div className="ms-1 flex items-center w-full">
        <StatutsCheckbox
          onChange={() => onTodoUpdate( {id: id, done: !done })}
          done={done}
        />

        <TodoText
          onChange={(newText) => onTodoUpdate( {id: id, text: newText })}
          done={done}
          text={text}
        />
      </div>
      {/* ICONS/BUTTONS */}
      <div className="me-2">
        <DeleteButton onClick={() => setDeleteModalState(true)} />
        {deleteModalState && (
          <DeleteModal
            type="todo"
            text={text}
            onDelete={() => onTodoDelete(id)}
            onCancel={() => setDeleteModalState(false)}
          />
        )}
      </div>
    </li>
  );
}
