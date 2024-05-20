/**************************************************************************** 
 ****************************************************************************
                        MAIN AND MAIN COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoList from "./TodoList";

export default function AppMain({
  todos,
  onCreate,
  onTodoUpdate,
  onTodoDelete,
  lists,
  selectedList,
  onListDelete,
  onListUpdate,
}) {
  return (
    <div className="flex-1 overflow-auto">
      {/* TODO CONTAINER */}
      <div>
        <TodoList
          todos={todos}
          onTodoUpdate={onTodoUpdate}
          onTodoDelete={onTodoDelete}
          onCreate={onCreate}
          lists={lists}
          selectedList={selectedList}
          onListDelete={onListDelete}
          onListUpdate={onListUpdate}
        />
      </div>
    </div>
  );
}
