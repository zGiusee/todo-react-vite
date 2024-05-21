
/****************************************************************************
 ****************************************************************************
                            USER IMPORTS
 *****************************************************************************
 *****************************************************************************/

export default function User({ user, onCreateList }) {
  return (
    <div className=" py-8 px-5 flex items-center content-between">
      <div className="flex items-center me-8">
        <img className="rounded-full w-10 h-10" src={getImageUrl(user.image)} />
        <span className="mx-2 text-sm">Benvenuto {user.name}!</span>
        <span className="">({user.id})</span>
      </div>
      <div
        className="flex items-center add-list-btn rounded-xl cursor-pointer"
        onClick={() => onCreateList()}
      >
        <div className=" py-1 px-3  border rounded-xl text-3xl">
          +
        </div>
      </div>
    </div>
  );
}

// FUNZIONE PER CONTROLLARE LE IMMAGINI DEGLI UTENTI
const defaultImage = "https://placehold.jp/202020/ffffff/32x32.png?text=User";
function getImageUrl(imageURL) {
  try {
    new URL(imageURL);
    return imageURL;
  } catch {
    return defaultImage;
  }
}
