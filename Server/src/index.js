const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const { consultApi } = require("./controllers/GetElementById");
const cors = require("cors");
const {
  ValidationCredentialst,
} = require("./middleware/ValidationCredentialst");
const { CreateNewUser } = require("./controllers/CreateNewUser");
const { UpdateUser } = require("./controllers/UpdateUser");
const morgan = require("morgan");
const { ValidationUserExits } = require("./middleware/ValidationUserExist");
const { ReadFileJson } = require("./utils/ReadFile");
const { sequelize, Character } = require("./DB_connection");
const { GiveUser } = require("./controllers/GiveUser");

app.use(cors());
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.get("/rickandmorty/character", async (req, res) => {
  let { id } = req.params;
  /*   return consultApi(id).then((response) => {
    if (response.id) {
      delete response.episode;
      res.send(JSON.stringify(response));
    } else {
      res.status(404).send({ message: "el personaje no se pudo obtener" });
    }
  }); */
  try {
    let newCharacters = [];

    for (let index = 1; index < 43; index++) {
      let data = await consultApi(index);
      data.results.forEach((el) => {
        newCharacters.push({
          id: el.id,
          name: el.name,
          status: el.status,
          species: el.species,
          type: el.type,
          gender: el.gender,
          origin: el.origin.name,
          location: el.location.name,
          image: el.image,
        });
      });
    }
    await Character.bulkCreate(newCharacters);
    res.send(newCharacters);
  } catch (error) {
    res.send();
    console.log(error);
  }
});

app.get("/rickandmorty/character/:id", async (req, res) => {
  let { id } = req.params;
  /*   return consultApi(id).then((response) => {
    if (response.id) {
      delete response.episode;
      res.send(JSON.stringify(response));
    } else {
      res.status(404).send({ message: "el personaje no se pudo obtener" });
    }
  }); */
  let data = await consultApi();
  res.send({ ...data });
});

app.post("/rickandmorty/singup", ValidationUserExits, async (req, res) => {
  /*   if (!req.userExist.email && !req.userExist.user) {
    CreateNewUser({ ...req.body });
    res.send({ succes: true }).status(202);
  } else {
    res.send({ succes: false, ...req.userExist });
  } */
  let { email, user_name, password } = req.body;
  if (email && user_name && password) {
    let validation = await CreateNewUser({ email, user_name, password });
    if (validation.status === 200) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: validation.message });
    }
  }
});

app.post("/rickandmorty/login", ValidationCredentialst, async (req, res) => {
  /*  let { email, password } = req.body;
  if (req.userAut.email && req.userAut.password) {
    let data = await ReadFileJson();
    let user = data.User.find(
      (user) => user.email === email && user.password === password
    );
    res.send({ Access: true, User: user }).status(200);
  } else {
    res.send({ Access: false, ...req.userAut });
  } */

  let { email, password } = req.body;
  let data = await GiveUser({ email, password });
  
  res.send(data);
});

app.put(
  "/rickandmorty/updateuser",
  ValidationUserExits,
  (req, res, next) => {
    if (req.userExist.email && req.userExist.user) {
      next();
    } else {
      return res.status(404).send({ error: "no existe el usuario" });
    }
  },
  UpdateUser
),
  app.listen(PORT, () => {
    sequelize.sync({ alter: true });
    console.log(`me estoy ejecutando en el puerto: ${PORT}`);
  });
