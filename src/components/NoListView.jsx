/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faCircleExclamation);
<i class="fa-solid fa-circle-exclamation"></i>;

/**************************************************************************** 
 ****************************************************************************
                            NO LIST VIEW COMPONENT
*****************************************************************************
*****************************************************************************/

export default function noListView() {
  return (
    <div className="flex-1 vh-100 flex justify-center content-center">
      {/* TODO CONTAINER */}
      <div className="text-center flex items-center">
        <div>
          <p>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className=" text-6xl text-blue-400"
            />
          </p>
          <p className="text-2xl text-blue-400 mt-3 mb-2">
            Nessun elenco selezionato!
          </p>
          <p className="text-1xl text-blue-400">
            Seleziona un elenco per aggiungere nuove attività.
          </p>
        </div>
      </div>
    </div>
  );
}
