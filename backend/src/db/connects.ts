import sqlite3 = require("sqlite3");
const fs = require("fs");

const FILE_PATH = fs.existsSync("./src/db/test.db");
const { Database } = sqlite3;
const createDbConnection = () => {
  const db = new Database("./src/db/test.db", (err) => {
    if (err) {
      console.error(err.message);
      return -1;
    }
  });
  console.log("DB connected");
  return db;
};
const db = createDbConnection();

export { db };
