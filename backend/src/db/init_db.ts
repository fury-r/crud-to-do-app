import { db, dbpg } from "./connects";

export const createUserTable = () => {
  db.exec(`
      CREATE TABLE IF NOT EXISTS Users
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email   VARCHAR(50) NOT NULL,
        password   VARCHAR(50) NOT NULL
      );
    `);
  dbpg.query(
    `
      CREATE TABLE IF NOT EXISTS Users
      (
        id BIGSERIAL PRIMARY KEY ,
        email   VARCHAR(50) NOT NULL,
        password   VARCHAR(150) NOT NULL
      );
    `
  );
  console.info("Users table created");
};
export const createTodoListTable = () => {
  db.exec(`
        CREATE TABLE IF NOT EXISTS Todo
        (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title   VARCHAR(50) NOT NULL,
          description   VARCHAR(50),
          due_date DATE NOT NULL,
          status VARCHAR(100),
          user_id INTEGER,
           CONSTRAINT FK_UserTodo  FOREIGN KEY(user_id) 
          REFERENCES Users(id)
            ON DELETE CASCADE

        );
      `);
  dbpg.query(`CREATE TABLE IF NOT EXISTS Todo
        (
          id BIGSERIAL PRIMARY KEY,
          title   VARCHAR(50) NOT NULL,
          description   VARCHAR(50),
          due_date DATE NOT NULL,
          status VARCHAR(100),

          user_id INTEGER,
           CONSTRAINT FK_UserTodo  FOREIGN KEY(user_id) 
          REFERENCES Users(id)
        );
      `);

  console.info("Todo table created");
};
