import sqlite3 = require("sqlite3");
import { Pool, PoolClient } from "pg";
import { existsSync } from "fs";

const FILE_PATH = existsSync("./src/db/test.db");
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

var dbpg: PoolClient;
const initDb = async () => {
  const dbpool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  dbpg = await dbpool.connect();
};
export { db, dbpg, initDb };
