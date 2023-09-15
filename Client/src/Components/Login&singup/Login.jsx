import React, { useState, useEffect, useRef } from "react";
import { SETACCESS } from "../../redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { ValidationData } from "../../helpers/validationsForm";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

function Login({ State }) {
  let Dispatch = useDispatch();
  let changeForm = State[0];
  let EmailInput = useRef(null);
  let userAccess = useSelector((state) => state.userAccess);
  let PasswordInput = useRef(null);
  let navigate = useNavigate();
  const [formData, setformData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (userAccess) {
      navigate("/home");
    }
  }, [userAccess]);

  const handleinput = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="form-container">
        <h1>INICIO DE SESION</h1>
        <form
          action=""
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              let Access = await ValidationData(
                formData,
                "http://localhost:3000/rickandmorty/login"
              );
              console.log(Access);
              if (Access.Access) {
                Dispatch(SETACCESS(Access.User));
                navigate("/home");
                alert("Bienvenido de nuevo");
              } else if (!Access.email || !Access.password) {
                alert(`el email o la contrasena son incorrrectas`);
                PasswordInput.current.value = "";
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <label>EMAIL</label>
          <input
            ref={EmailInput}
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleinput(e);
            }}
          />
          <label>PASSWORD</label>
          <input
            ref={PasswordInput}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleinput(e);
            }}
          />
          <button type="submit">INICIO DE SESION</button>
          <div className="text-href">
            <p>{"No tienes una cuenta ? "}</p>
            <a
              onClick={() => {
                changeForm(State[1] ? false : true);
              }}
            >
              ir a Registrarse
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
