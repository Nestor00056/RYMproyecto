const fs = require("fs");
const path = require("path");
const { GenerateNewIndex } = require("../utils/GenerateIndex");
const { WriteFileJSon } = require("../utils/WriteFile");
const { ReadFileJson } = require("../utils/ReadFile");

/* const CreateNewUser = async (user) => {
  try {
    let root = path.join(__dirname, "../data.json");
    let index = await GenerateNewIndex();
    let data = await ReadFileJson();
    let newUser = {
      id: index,
      email: user.email,
      password: user.password,
      cards: [],
      historyId: [],
      favCards: {
        fav: [],
        filterFav: [],
      },
      details: {
        user_name: user.user_name,
        about_me: "",
        user_image: "",
      },
    };

    WriteFileJSon({ ...data, User: [...data.User, newUser] });
  } catch (error) {}
};

 */
const { User } = require("../DB_connection");

const CreateNewUser = async (user) => {
  try {
    await User.create({
      email: user.email,
      password: user.password,
      user_name: user.user_name,
      credentials_type: "user",
    });
    let review = await User.findOne({
      where: {
        email: user.email,
        user_name: user.user_name,
      },
    });

    if (review?.dataValues.id) {
      return { message: "el usuario ha sido creado exitosamente", status: 200 };
    }
  } catch (error) {
    return { status: 422, message: error };
  }
};
module.exports = { CreateNewUser };
