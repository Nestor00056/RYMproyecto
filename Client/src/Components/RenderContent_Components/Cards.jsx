import { useState, useEffect, useRef } from "react";
import CardDeatiled from "./CardDatiled";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToFavorites,
  DELETECARD,
  DeleteToFavorites,
} from "../../redux/Actions/Actions";

function Cards({ data, isFavorite }) {
  let userData = useSelector((state) => state.access_user);
  let Dispatch = useDispatch();
  let changeHeart = useRef(null);
  const [render, setRender] = useState(false);
  const [Favorite, setFavorite] = useState(false);

  const verificationValue = () => {
    let value = false;
    let Favs = userData.favCards.fav;
    Favs.forEach((el) => {
      if (el.id === data.id) {
        value = true;
      }
    });

    return value;
  };

  const toggleFavorite = () => {
    let fav = verificationValue();
    if (fav) {
      Dispatch(DeleteToFavorites(data.id));
    } else {
      Dispatch(AddToFavorites(data));
    }
  };

  useEffect(() => {
    let fav = verificationValue();
    if (fav) {
      setFavorite(true);
    }
  }, [userData]);
  return (
    <>
      <div className="Card">
        <img className="image-card" src={data.image} alt="" />
        <h1>
          {data.name} {"ID: " + data.id}
        </h1>
        <div className="button-container">
          <button
            onClick={() => {
              setRender(true);
            }}
          >
            Mas detalles
          </button>
          <span
            className="heart"
            ref={changeHeart}
            onClick={() => {
              toggleFavorite();
            }}
          >
            {Favorite ? "💚" : "🤍"}
          </span>
          {isFavorite ? (
            ""
          ) : (
            <button
              onClick={() => {
                Dispatch(DELETECARD(data.id));
              }}
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
      {render ? (
        <CardDeatiled dataRender={data} isActive={setRender}></CardDeatiled>
      ) : (
        ""
      )}
    </>
  );
}

export default Cards;
