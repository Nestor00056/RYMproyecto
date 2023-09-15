const fs = require("fs");

const ReadFileJson = (root) => {
  try {
    const dataJson = fs.readFileSync(root, "utf-8");
    const data = JSON.parse(dataJson);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { ReadFileJson };
