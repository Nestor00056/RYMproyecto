import { useEffect } from "react";
import RenderCards from "../../Components/RenderContent_Components/RenderCards";
import { useDispatch, useSelector } from "react-redux";
import { ValidationData } from "../../helpers/validationsForm";
import { UpdateUser } from "../../redux/Actions/Actions";

function Home() {
  return (
    <>
      <RenderCards></RenderCards>
    </>
  );
}

export default Home;
