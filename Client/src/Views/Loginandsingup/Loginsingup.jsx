import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import Login from "../../Components/Login&singup/Login";
import "./Logandsing.css";
import Singup from "../../Components/Login&singup/singup";

function Loginsingup() {
  const [LAS, setLAS] = useState(false);
  return (
    <>
      {LAS ? (
        <Singup State={[setLAS, LAS]}></Singup>
      ) : (
        <Login State={[setLAS, LAS]}></Login>
      )}
    </>
  );
}

export default Loginsingup;
