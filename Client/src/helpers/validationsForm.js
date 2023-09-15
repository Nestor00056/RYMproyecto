export const validationForms = (obj) => {
  let error = {};

  if (!/^(?=.*[0-9]).+$/.test(obj.password)) {
    error.password = "la contraseña debe de tener un numero como minimo";
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(obj.email)) {
    error.email = "email incorrecto";
  }
  if (obj.password.length > 11 || obj.password.length < 6) {
    error.password =
      "la contraseña debe de tener entre 6 y 10 caracteres que incluyan numeros y letras";
  }

  if (obj.password.length === 0) {
    error.password = "el campo de la contrasena no debe de estar vacio";
  }

  if (obj.email.length === 0) {
    error.email = "este campo no puede estar vacio";
  }

  if (obj.email.length > 35) {
    error.email = "El email es muy largo";
  }

  return error;
};

export const ValidationData = (Data, url) => {
  let data = Data.id ? { ...Data } : Data.email ? { ...Data } : null;
  if (data && url) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `el error es ${response.statusText} y el codigo es: ${response.status}`
          );
        }

        return response.json();
      })
      .catch((error) => console.log(error));
  }
};

/* export const validationValue = (Username, Data) => {
  let value = false;
  Data.forEach((el) => {
    if (el.details.user_name === Username) value = true;
  });
  return value;
}; */

export const validationUsername = (Username) => {
  let error = {};
  if (!/^[a-zA-Z0-9]+$/.test(Username)) {
    error.length =
      "el user name que estas escribiendo no debe tener caracteres especiales como : espacios,+,*,/,-,etc";
  }

  if (Username.length > 30) {
    error.length = "El user name es muy largo";
  }

  if (Username.length < 4) {
    error.length = "El user name es muy corto";
  }
  if (Username.length === 0) {
    error.length = "El campo user name no debe de estar vacio";
  }

  return error;
};
