/**************************************************************************** 
 ****************************************************************************
                                LIST TITLE COMPONENT
*****************************************************************************
*****************************************************************************/

import { useState } from "react";

export default function listTitle({ text, onChange }) {
  const [editableName, setEditableName] = useState(text);
  const [clickedName, setClickedName] = useState(false);

  return (
    <div>
      {clickedName === false ? (
        <h1 onClick={() => setClickedName(true)} className="text-6xl mx-5">
          {editableName}
        </h1>
      ) : (
        <input
          className="focus:outline-none rounded-md mx-5 text-red-500 py-2 text-4xl  w-full border-collapse"
          onChange={(event) => setEditableName(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              if (editableName.trim().length > 0) {
                onChange(editableName);
                setClickedName(false);
              }
            }
          }}
          onBlur={() => (
            editableName.trim().length > 0 ? onChange(editableName) : "",
            setClickedName(false)
          )}
          value={editableName}
          type="text"
        ></input>
      )}
    </div>
  );
}
