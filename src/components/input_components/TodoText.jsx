/**************************************************************************** 
 ****************************************************************************
                                TODO TEXT
*****************************************************************************
*****************************************************************************/

import { useState } from "react";

export default function todoText({ text, done, onChange }) {
  const todoTextClasses = `${done ? "line-through" : ""} text-sm `;

  const [editableText, setEditableText] = useState(text);
  const [clickedText, setClickedText] = useState(false);
  return (
    <div className="w-full">
      {clickedText === false ? (
        <span onClick={() => setClickedText(true)} className={todoTextClasses}>
          {editableText}
        </span>
      ) : (
        <input
          className="focus:outline-none rounded-md px-4 py-2 border-slate-600 w-full border-collapse"
          onChange={(event) => setEditableText(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              if (editableText.trim().length > 0) {
                onChange(editableText);
                setClickedText(false);
              }
            }
          }}
          onBlur={() => (
            editableText.trim().length > 0 ? onChange(editableText) : "",
            setClickedText(false)
          )}
          value={editableText}
          type="text"
        ></input>
      )}
    </div>
  );
}
