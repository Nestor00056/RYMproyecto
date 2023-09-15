import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Menu from "../Components/Nav/Menu";
import { useSelector } from "react-redux";
import CardDeatiled from "../Components/RenderContent_Components/CardDatiled";
function Detail() {
  let param = useParams();
  const [Card, setCard] = useState(false);
  const [Search, setSearch] = useState("");

  return <></>;
}

export default Detail;
