import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import "./Nav.css";

function Nav({ children }) {
  return (
    <>
      <main className="main-content">
        <article className="content">
          <h1 className="tittle">Rick and Morty</h1>
          {children}
        </article>
      </main>
    </>
  );
}

export default Nav;
