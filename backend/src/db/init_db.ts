import connectDb = require("./connects");
const db = connectDb.db;
const createUserTable = () => {
  db.exec(`
      CREATE TABLE Users
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email   VARCHAR(50) NOT NULL,
        password   VARCHAR(50) NOT NULL
      );
    `);
};
const createTodoListTable = () => {
  db.exec(`
        CREATE TABLE Todo
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title   VARCHAR(50) NOT NULL,
          description   VARCHAR(50),
          due_date DATE NOT NULL,
          user_id INTEGER,
           CONSTRAINT FK_UserTodo  FOREIGN KEY(user_id) 
          REFERENCES Users(id)
        );
      `);
};
createTodoListTable();
createUserTable();
