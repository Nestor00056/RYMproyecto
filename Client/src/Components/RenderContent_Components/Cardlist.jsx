import { useState, useEffect } from "react";
import Cards from "./Cards";

function Cardlist({ ListCards, isFavorite }) {
  return (
    <div className="card-list">
      {ListCards
        ? ListCards.map((el) => {
            return (
              <Cards
                key={el.id + Math.random() * 1000000}
                data={el}
                isFavorite={isFavorite}
              ></Cards>
            );
          })
        : ""}
    </div>
  );
}

export default Cardlist;
