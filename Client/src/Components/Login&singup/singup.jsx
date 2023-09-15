import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ValidationData,
  validationUsername,
} from "../../helpers/validationsForm";
import { validationForms } from "../../helpers/validationsForm";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { ADDNEWUSER } from "../../redux/Actions/Actions";

function Singup({ State }) {
  let changeForm = State[0];
  const [formData, setformData] = useState({ email: "", password: "" });
  const [username, setUsername] = useState("");
  const [UserError, setUsererror] = useState({ length: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const handleIpuntUsername = (event) => {
    setUsername(event.target.value);
    setUsererror(validationUsername(event.target.value));
  };

  const handleinput = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError(
      validationForms({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };
  //
  const handleEvent = async (e) => {
    e.preventDefault();

    if (!error.email && !error.password && !UserError.length) {
      let CREATE = await ValidationData(
        {
          ...formData,
          user_name: username,
        },
        "http://localhost:3000/rickandmorty/singup"
      );
      /* let value = validationValue(username, Data); */
      if (CREATE.succes) {
        alert("Los datos se han registrado correctamente");
        changeForm(State[1] ? false : true);
      } else if (CREATE.user) {
        alert("Este usuario ya existe por favor elije otro");
      } else if (CREATE.email) {
        alert("Este correo ya existe por favor elije otro");
      }
    } else if (!formData.email || !formData.password || !username) {
      alert("todos los campos deben estar llenos verifique si asi es");
    }
  };
  //
  return (
    <div className="form-container">
      <h1>REGISTRARSE</h1>
      <form
        action=""
        onSubmit={(e) => {
          handleEvent(e);
        }}
      >
        <label className="label">EMAIL </label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => {
            handleinput(e);
          }}
        />
        <p>{error.email}</p>
        <label className="label">UserName</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            handleIpuntUsername(e);
          }}
        />
        <p>{UserError.length}</p>

        <label className="label">PASSWORD</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            handleinput(e);
          }}
        />
        <p>{error.password}</p>
        <button type="submit">REGISTRARSE</button>
        <div className="text-href">
          <p>{"Ya tienes cuenta ? "}</p>
          <a
            onClick={() => {
              changeForm(State[1] ? false : true);
            }}
          >
            ir a Inicio de sesion
          </a>
        </div>
      </form>
    </div>
  );
}

export default Singup;
