const path = require("path");
const { ReadFileJson } = require("../utils/ReadFile");
const { User } = require("../DB_connection");
const ValidationUserExits = async (req, res, next) => {
  /*   if (req.body.id) {
    let { email } = req.body;
    let { user_name } = req.body.details;
    let data = await ReadFileJson();
    req.userExist = { email: false, user: false };
    data.User.forEach((el) => {
      if (el.email === email) {
        req.userExist = { ...req.userExist, email: true };
        if (el.details.user_name === user_name) {
          req.userExist = { ...req.userExist, user: true };
        }
      }
    });
    next();
  } else {
    console.log(req.body);
    res.status(405).send({
      messasge:
        "no se pudo completar la solicitud dado que no esncontraron datos en el envio",
    });
  } */
  try {
    let { email, user_name } = req.body;
    /*  let newUser = await User.create({
      email: email,
      password: "Camilo1234",
      user_name,
    }); */
    let newUser = await User.findOne({ where: { user_name } });
    let newEmail = await User.findOne({ where: { email } });
    if (newUser?.dataValues) {
      return res.status(409).send({ success: false, user: true });
    } else if (newEmail?.dataValues) {
      return res.status(409).send({ success: false, email: true });
    } else {
      next();
    }
  } catch (error) {
    res.status(422).send({ error: "hubo un error al mandar datos" });
    console.log(error);
  }
};

module.exports = { ValidationUserExits };
