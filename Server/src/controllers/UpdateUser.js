const fs = require("fs");
const path = require("path");
const { ReadFileJson } = require("../utils/ReadFile");
const { WriteFileJSon } = require("../utils/WriteFile");

const UpdateUser = async (req, res) => {
  let user = { ...req.body };
  let data = await ReadFileJson();
  let isOk = false;
  data.User.forEach((el, index) => {
    if (user.id === el.id) {
      data.User[index] = user;
      isOk = true;
    }
  });
  let newuser = JSON.stringify(data, null, 2);
  console.log("me he hecho");
  if (isOk) {
    /*     fs.writeFile(
      path.join(__dirname, "../utils/data.json"),
      newuser,
      "utf-8",
      (error) => {
        if (error) console.log("no se pudo escribir el archivo");
        res.send({ message: "el usuario fue actuaizado correctamente" });
      }
    ); */
    let response = WriteFileJSon(data);
    if (response.statusWrite)
      return res.send({ message: "el usuario fue actuaizado correctamente" });
  } else {
    res.status(404).send({ message: "el usuario no se actualizo" });
  }
};

module.exports = { UpdateUser };
