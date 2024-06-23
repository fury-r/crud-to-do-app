import bodyParser from "body-parser";
import express from "express";
import { configDotenv } from "dotenv";
import { isAuthenicatedUser } from "./src/auth";
import { loginUser, registerUser, validateUser } from "./src/controller/user";
import cors from "cors";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  bulkGetTodo,
} from "./src/controller/toDo";
import { db, dbpg, initDb } from "./src/db/connects";
import { createTodoListTable, createUserTable } from "./src/db/init_db";

configDotenv();

async function main() {
  const app = express();
  await initDb();
  createUserTable();
  createTodoListTable();
  app.use(cors());
  app.use(bodyParser.json());

  app.post("/register", registerUser);
  app.post("/login", loginUser);
  app.get("/validate", validateUser);

  app.post("/todo/add", isAuthenicatedUser, addTodo);
  app.delete("/todo/delete/:id", isAuthenicatedUser, deleteTodo);
  app.post("/todo/update", isAuthenicatedUser, updateTodo);
  app.get("/todo/get/:id", isAuthenicatedUser, getTodo);
  app.post("/todo/bulk/get", isAuthenicatedUser, bulkGetTodo);

  app.listen(8000, () => {
    console.log("Server started on port 8000");
  });
}

try {
  main();
} catch (error) {
  db.close();
  dbpg.release();
}
