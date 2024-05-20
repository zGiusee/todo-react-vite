/**************************************************************************** 
 ****************************************************************************
                    SIDEBAR AND SIDEBAR COMPONENTS 
*****************************************************************************
*****************************************************************************/
import SidebarList from "./SidebarList.jsx";
import User from "./User.jsx";
// import { useSelector, useDispatch } from "react-redux";

export default function AppSidebar({
  user,
  lists,
  setTodosByListId,
  setSelectedList,
  selectedList,
  onCreateList,
}) {
  return (
    <div className="flex h-screen overflow-auto text-white bg-gray-600 ">
      <div className="">
        {/* USER INFO'S */}
        <div>
          <User user={user} onCreateList={onCreateList} />
        </div>

        <hr className="mx-5 text-white" />

        <div>
          <SidebarList
            lists={lists}
            setTodosByListId={setTodosByListId}
            setSelectedList={setSelectedList}
            selectedList={selectedList}
          />
        </div>
      </div>
    </div>
  );
}
