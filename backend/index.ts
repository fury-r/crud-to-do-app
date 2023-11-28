import express = require("express");
import user = require("./src/controller/user");
import bodyParser = require("body-parser");

import toDo = require("./src/controller/toDo");
import cors = require("cors");
import dotenv = require("dotenv");
import auth = require("./src/auth");
dotenv.configDotenv();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/login", user.loginUser);
app.post("/register", user.registerUser);

app.post("/todo/add", auth.isAuthenicatedUser, toDo.addTodo);
app.delete("/todo/delete/:id", auth.isAuthenicatedUser, toDo.deleteTodo);
app.post("/todo/update", auth.isAuthenicatedUser, toDo.updateTodo);
app.get("/todo/get/:id", auth.isAuthenicatedUser, toDo.getTodo);
app.post("/todo/bulk/get", auth.isAuthenicatedUser, toDo.bulkGetTodo);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
