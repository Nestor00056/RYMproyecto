const fs = require("fs");
const path = require("path");
const database = path.join(__dirname, ".." + "/data.json");

const UpdateUser = (req, res) => {
  try {
    let user = { ...req.body };
    let JSONData = fs.readFileSync(database, "utf-8");
    let data = JSON.parse(JSONData);
    let isOk = false;
    data.User.forEach((el, index) => {
      if (user.id === el.id) {
        data.User[index] = user;
        isOk = true;
      }
    });
    let newData = JSON.stringify(data, null, 2);

    if (isOk) {
      fs.writeFileSync(database, newData, "utf-8");
      res
        .send({ message: "el usuario fue actuaizado correctamente" })
        .status(200);
    } else {
      res.status(404).send({ message: "el usuario no se actualizo" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { UpdateUser };
