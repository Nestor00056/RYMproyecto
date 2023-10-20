import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { DELETEACCESS, UpdateUser } from "../../redux/Actions/Actions";
import { ValidationData } from "../../helpers/validationsForm";

function Menu({ userData }) {
  let navigate = useNavigate();
  let Dispatch = useDispatch();
  const handleNav = (url, data) => {
    navigate(url, { state: data });
  };

  const handleLogout = async (event) => {
    try {
      Dispatch(UpdateUser());
      event.preventDefault();

      let responseData = await ValidationData(
        userData.access_user,
        "http://localhost:3000/rickandmorty/updateuser",
        "PUT"
      );

      if (responseData.message === "el usuario fue actuaizado correctamente") {
        Dispatch(DELETEACCESS());
        navigate("/");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      alert("");
      console.log(error);
    }
  };
  return (
    <>
      <nav className="nav-menu">
        <ul className="ul-menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/Favorites">Favorites</NavLink>
          <NavLink
            to="/"
            onClick={(e) => {
              handleLogout(e);
            }}
          >
            Log Out
          </NavLink>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
