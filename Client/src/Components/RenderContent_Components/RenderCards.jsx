import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "../Nav/Menu";
import InputAdd from "./Inputadd";
import Cardlist from "./Cardlist";
import "./RenderCards.css";
import { UpdateUser, favFilter } from "../../redux/Actions/Actions";
import { ValidationData } from "../../helpers/validationsForm";

function RenderCards({ isFavorite }) {
  let Dispatch = useDispatch();
  let navigate = useNavigate();
  let AccessUser = useSelector((state) => state.userAccess);
  let userData = useSelector((state) => state.access_user);
  let userUpdate = useSelector((state) => state.update);
  let Cards = isFavorite ? userData.favCards.filterFav : userData.cards;

  useEffect(() => {
    let updateData = async (tries = 0) => {
      try {
        if (userData) {
          await ValidationData(
            userData,
            "http://localhost:3000/rickandmorty/updateuser",
            "PUT"
          );
        }
      } catch (error) {
        console.log(error);
        alert(
          " no se puedieron realizar los cambios, por favor revisa tu conexion"
        );
      }
    };
    const redirect = () => {
      navigate("/");
    };
    if (!AccessUser) {
      redirect();
    }
    return () => {
      if (userData.favCards.filterFav.length < userData.favCards.fav.length) {
        Dispatch(favFilter({}));
      }

      if (userUpdate) {
        updateData();
        Dispatch(UpdateUser());
      }
    };
  }, [userData]);

  return (
    <>
      <article className="userName">
        <h1>{userData.details?.user_name}</h1>
      </article>
      <article className="ContentRender">
        <Menu
          userData={{
            access_user: userData,
            update: userUpdate,
            userAccess: AccessUser,
          }}
        ></Menu>
        <InputAdd isFavorite={isFavorite}></InputAdd>
        <Cardlist ListCards={Cards} isFavorite={isFavorite}></Cardlist>
      </article>
    </>
  );
}

export default RenderCards;
