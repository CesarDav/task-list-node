const fs = require("fs");

const filepPath = "./db/data.json";

const saveData = (data) => {
  fs.writeFileSync(filepPath, JSON.stringify(data));
};

const readData = () => {
  if (!fs.existsSync(filepPath)) return null;

  const info = fs.readFileSync(filepPath, { encoding: "utf-8" });

  const data = JSON.parse(info);

  return data;
};

module.exports = {
  saveData,
  readData,
};
