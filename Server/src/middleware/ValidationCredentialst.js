const fs = require("fs");
const path = require("path");

const ValidationCredentialst = (req, res, next) => {
  let { email, user_name, password } = req.body;
  let db = path.join(__dirname, "..", "/data.json");
  let JSONcontent = fs.readFileSync(db, "utf-8");
  let Data = JSON.parse(JSONcontent);
  console.log();

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
      if (el.email === email) {
        req.userAut = { ...req.userAut, email: true };
      }

      if (el.password === password) {
        req.userAut = { ...req.userAut, password: true };
      }
    });
  }
  next();
};

module.exports = { ValidationCredentialst };
