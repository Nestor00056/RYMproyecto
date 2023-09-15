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
const database = __dirname + "/data.json";
const morgan = require("morgan");
const { ValidationUserExits } = require("./middleware/ValidationUserExist");
const { ReadFileJson } = require("./utils/ReadFile");

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

app.get("/rickandmorty/character/:id", (req, res) => {
  let { id } = req.params;
  return consultApi(id).then((response) => {
    if (response.id) {
      delete response.episode;
      res.send(JSON.stringify(response));
    } else {
      res.status(404).send({ message: "el personaje no se pudo obtener" });
    }
  });
});

app.post("/rickandmorty/singup", ValidationCredentialst, (req, res) => {
  if (!req.userExist.email && !req.userExist.user) {
    CreateNewUser({ ...req.body });
    res.send({ succes: true }).status(202);
  } else {
    res.send({ succes: false, ...req.userExist });
  }
});

app.post("/rickandmorty/login", ValidationCredentialst, async (req, res) => {
  let { email, password } = req.body;
  if (req.userAut.email && req.userAut.password) {
    let data = await ReadFileJson(database);
    let user = data.User.find(
      (user) => user.email === email && user.password === password
    );
    res.send({ Access: true, User: user }).status(200);
  } else {
    res.send({ Access: false, ...req.userAut });
  }
});

app.post(
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
);

app.listen(PORT, () => {
  console.log(`me estoy ejecutando en el puerto: ${PORT}`);
});
