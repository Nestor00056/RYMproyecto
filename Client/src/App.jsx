import { useEffect, useState } from "react";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Views/Home/Home";
import ErrorDirection from "./Views/ErrorDirection";
import Nav from "./Components/Nav/Nav";
import About from "./Views/About/About";
import Detail from "./Views/Details";
import Loginsingup from "./Views/Loginandsingup/Loginsingup";
import Favs from "./Views/Fav";

function App() {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Nav>
        <Routes>
          <Route path="/">
            <Route index element={<Loginsingup></Loginsingup>} />
            <Route path="home" element={<Home></Home>} />
            <Route path="about" element={<About></About>} />
            <Route path="Favorites" element={<Favs />} />

            <Route path="detail/:id" element={<Detail></Detail>} />
          </Route>
          <Route path="*" element={<ErrorDirection></ErrorDirection>}></Route>
        </Routes>
      </Nav>
    </>
  );
}

export default App;
