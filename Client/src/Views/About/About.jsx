import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Menu from "../../Components/Nav/Menu";
import { useSelector } from "react-redux";
import style from "./About.module.css";

function About() {
  let userData = useSelector((state) => state.access_user);
  let userupdate = useSelector((state) => state.update);
  let UserAccess = useSelector((state) => state.userAccess);
  let navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      navigate("/");
    };
    if (!UserAccess) {
      redirect();
    }
  }, [userData]);

  return (
    <>
      <Menu
        userData={{
          access_user: userData,
          update: userupdate,
          userAccess: UserAccess,
        }}
      ></Menu>
      <div className={style.aboutContainer}>
        <div className={style.mainContent}>
          <img
            src={userData.details.user_image}
            alt=""
            className={style.userImage}
          />
          <div className={style.userDetails}>
            <h1 className={style.userName}>{userData.details.user_name}</h1>
            <h2>
              {userData.details.about_me
                ? "Acerca de ti :3"
                : "Cuentanos un poco mas de ti"}
            </h2>

            <div className="about-me">
              {userData.details.about_me ? userData.details.about_me : "hola"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
