const fs = require("fs");
const path = require("path");
const { GenerateNewIndex } = require("../utils/GenerateIndex");
const { WriteFileJSon } = require("../utils/WriteFile");
const { ReadFileJson } = require("../utils/ReadFile");

const CreateNewUser = async (user) => {
  try {
    let root = path.join(__dirname, "../data.json");
    let index = await GenerateNewIndex();
    let data = await ReadFileJson(root, "utf-8");
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

module.exports = { CreateNewUser };
