const fs = require("fs");
const path = require("path");
const { ReadFileJson } = require("./ReadFile");

const GenerateNewIndex = async () => {
  try {
    let database = path.join(__dirname, "../data.json");
    let data = ReadFileJson(database, "utf-8");
    let newIndex = 1;
    data.User.forEach((el) => {
      if (newIndex <= el.id) {
        newIndex = el.id + 1;
      }
    });
    return newIndex;
  } catch (error) {
    return { isfail: error };
  }
};

module.exports = { GenerateNewIndex };
