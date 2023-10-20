const fs = require("fs");
const path = require("path");
const WriteFileJSon = (data) => {
  try {
    let root = path.join(__dirname, "/data.json");
    let newData = JSON.stringify(data, null, 2);
    fs.writeFileSync(root, newData, "utf-8");
    return { statusWrite: true };
  } catch (error) {
    return { statusWrite: false, error };
  }
};

module.exports = { WriteFileJSon };
