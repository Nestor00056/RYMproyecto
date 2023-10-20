const fs = require("fs");
const path = require("path");
const { ReadFileJson } = require("../utils/ReadFile");
const { User } = require("../DB_connection");

const ValidationCredentialst = async (req, res, next) => {
  /*   let { email, user_name, password } = req.body;
  let db = path.join(__dirname, "..", "/data.json");
  let Data = await ReadFileJson();

  if (req.url === "/rickandmorty/singup") {
    req.userExist = { user: false, email: false };
    Data.User.forEach((el) => {
      if (el.email === email) {
        req.userExist = { ...req.userExist, email: true };
      }

      if (el.details.user_name === user_name) {
        req.userExist = { ...req.userExist, user: true };
      }
    });
  }

  if (req.url === "/rickandmorty/login") {
    req.userAut = { email: false, password: false };
    Data.User.forEach((el) => {
      if (el.email === email && el.password === password) {
        req.userAut = { ...req.userAut, email: true, password: true };
      }
    });
  }
  next(); */
  try {
    let { email, password } = req.body;

    if ((email, password)) {
      let validationUser = await User.findOne({
        where: {
          email,
          password,
          credentials_type: "user",
        },
      });
      if (validationUser?.dataValues.id) {
        next();
      } else {
        res.status(401).send({ email: false, password: false });
      }
    }
  } catch (error) {
    res.send({ error });
  }
};

module.exports = { ValidationCredentialst };
