import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADDNEWCARD, favFilter } from "../../redux/Actions/Actions";

function InputAdd({ isFavorite }) {
  let inputRef = useRef(null);
  let Data = useSelector((state) => state.access_user);
  let Dispatch = useDispatch();

  let GenderInput = useRef(null),
    OrderInput = useRef(null);

  const Addcard = () => {
    let value = inputRef.current.value;
    if (
      value.length > 3 ||
      !typeof parseInt(value) === "number" ||
      value === "0"
    ) {
      alert("por favor ingresar un numero del 1 al 826 ");
      inputRef.current.value = "";
    } else if (value.length <= 3 && parseInt(value) <= 826) {
      if (!Data.historyId.includes(parseInt(value))) {
        Dispatch(ADDNEWCARD(value));
        inputRef.current.value = "";
      } else {
        alert("por favor ingresa otro personaje que este ya esta");
        inputRef.current.value = "";
      }
    } else {
      alert("por favor ingresar un numero del 1 al 826 ");
      inputRef.current.value = "";
    }
  };

  const filterCards = () => {
    Dispatch(
      favFilter({
        Gender: GenderInput.current.value,
        Order: OrderInput.current.value,
      })
    );
  };

  return (
    <div className="input-content">
      <div className="inputs-content">
        <h1 className="input-h1">
          {isFavorite ? "Filter Character" : "Add New Character"}
        </h1>
        {isFavorite ? (
          ""
        ) : (
          <input
            className="input"
            type="text"
            placeholder={"Add character"}
            ref={inputRef}
          />
        )}
        <button
          className="input-button"
          onClick={() => {
            isFavorite ? filterCards() : Addcard();
          }}
        >
          {isFavorite ? "Filter Character" : "Add Character"}
        </button>
        {isFavorite ? (
          ""
        ) : (
          <button
            className="input-button"
            onClick={() => {
              Dispatch(ADDNEWCARD(parseInt(Math.random() * (826 - 1) + 1)));
            }}
          >
            Random character
          </button>
        )}
      </div>
      {isFavorite ? (
        <div className="inputs-content">
          <h1 className="input-h1">Gender</h1>
          <select className="select" ref={GenderInput}>
            <option value="">None</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="uknow">uknow</option>
            <option value="Genderless">Genderless</option>
          </select>
          <h1 className="input-h1">Order</h1>
          <select className="select" ref={OrderInput}>
            <option value="">None</option>
            <option value="OrdenA">Orden A</option>
            <option value="OrdenD">Orden D</option>
          </select>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputAdd;
