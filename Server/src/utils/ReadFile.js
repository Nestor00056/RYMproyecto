const fs = require("fs");
const path = require("path");

const ReadFileJson = async () => {
  try {
    const dataJson = fs.readFileSync(
      path.join(__dirname, "/data.json"),
      "utf-8"
    );
    const data = JSON.parse(dataJson);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { ReadFileJson };
