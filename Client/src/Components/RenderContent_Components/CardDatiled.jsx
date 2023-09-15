import React, { useState, useEffect } from "react";

function CardDeatiled({ dataRender, isActive }) {
  return (
    <div className="screen">
      <div className="Card-detailed">
        <div className="container-details">
          <span
            className="close-button"
            onClick={() => {
              isActive(false);
            }}
          >
            X
          </span>
          <img className="card-image-datails" src={dataRender?.image} alt="" />
          <article className="details">
            <h1>INFORMATION</h1>
            <label htmlFor="">Nombre:</label>
            <p>{dataRender?.name}</p>
            <label htmlFor="">Status:</label>
            <p>{dataRender?.status}</p>
            <label htmlFor="">Type:</label>
            <p>{dataRender?.type}</p>
            <label htmlFor="">Gender:</label>
            <p>{dataRender?.gender}</p>
            <label htmlFor="">Origin:</label>
            <p>{dataRender?.origin.name}</p>
            <label htmlFor="">Actual Location:</label>
            <p>{dataRender?.location.name}</p>
          </article>
        </div>
      </div>
    </div>
  );
}

export default CardDeatiled;
