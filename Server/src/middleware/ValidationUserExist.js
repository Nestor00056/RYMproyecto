const path = require("path");
const { ReadFileJson } = require("../utils/ReadFile");

const ValidationUserExits = async (req, res, next) => {
  if (req.body.id) {
    let root = path.join(__dirname, "../data.json");
    let { email } = req.body;
    let { user_name } = req.body.details;
    let data = await ReadFileJson(root);
    req.userExist = { email: false, user: false };
    data.User.forEach((el) => {
      if (el.email === email) {
        req.userExist = { ...req.userExist, email: true };
      }
      if (el.details.user_name === user_name) {
        req.userExist = { ...req.userExist, user: true };
      }
    });
    next();
  } else {
    console.log(req.body);
    res.status(404).send({
      messasge:
        "no se pudo completar la solicitud dado que no esncontraron datos en el envio",
    });
  }
};

module.exports = { ValidationUserExits };
