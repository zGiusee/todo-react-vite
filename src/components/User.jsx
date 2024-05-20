
export default function User({ user, onCreateList }) {
  return (
    <div className=" py-8 px-5 flex items-center content-between">
      <div className="flex items-center me-8">
        <img className="rounded-full" src={getImageUrl(user.image)} />
        <span className="mx-2 text-sm">Benvenuto {user.name}!</span>
        <span className="">({user.id})</span>
      </div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => onCreateList()}
      >
        <div className=" text-gray-400 pb-1 px-2 border rounded-xl border-gray-400 text-3xl">
          +
        </div>
      </div>
    </div>
  );
}

// ! FUNZIONE PER CONTROLLARE LE IMMAGINI DEGLI UTENTI
const defaultImage = "https://placehold.jp/202020/ffffff/32x32.png?text=User";
function getImageUrl(imageURL) {
  try {
    new URL(imageURL);
    return imageURL;
  } catch {
    return defaultImage;
  }
}
