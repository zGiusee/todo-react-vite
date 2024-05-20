/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faTrash);

/**************************************************************************** 
 ****************************************************************************
                                DELETE BUTTON
*****************************************************************************
*****************************************************************************/

export default function deleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mx-2 my-btn-delete rounded-lg"
    >
      <FontAwesomeIcon icon={faTrash} className="text-sm my-delete-icon" />
    </button>
  );
}
