export default function DeleteModal({ onDelete, onCancel, text, type }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">{headContent(type)}</h3>
            </div>
            {/*body*/}
            <div className="relative px-6  py-4 flex-auto">
              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                {/* Body content */}
                {bodyContent(type, text)}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end px-4 py-3 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-gray-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onCancel}
              >
                Chiudi
              </button>
              <button
                className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onDelete}
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

function bodyContent(type, text) {
  let string = "";
  switch (type) {
    case "todo":
      string = `Sei sicuro di voler eliminare la seguente attività "${text}"?`;
      break;
    case "list":
      string = `Sei sicuro di voler eliminare la seguente lista "${text}"?`;
      break;
    default:
      break;
  }

  return string;
}

function headContent(type) {
  let string = "";
  switch (type) {
    case "todo":
      string = `Eliminazione Attività`;
      break;
    case "list":
      string = `Eliminazione Lista`;
      break;
    default:
      break;
  }

  return string;
}
