import { NavLink } from "react-router-dom";

function ErrorDirection() {
  return (
    <>
      <h1 className="title-error">404</h1>
      <h2 className="legend-error">Pagina no encontrada </h2>
      <NavLink to="/">Login</NavLink>
    </>
  );
}

export default ErrorDirection;
