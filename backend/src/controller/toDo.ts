import dbConnect = require("../db/connects");
const db = dbConnect.db;
import auth = require("../auth");

const addTodo = async (
  req: {
    query: any;
    headers: any;
    body: {
      token: any;
      title: string;
      description: string;
      due_date: string;
    };
  },
  res: any
) => {
  const { title, description, due_date } = req.body;
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.headers["authorization"].split(" ")[1];
    const id = await auth.validateToken(token);

    await db.run(
      `INSERT INTO Todo(title,description,due_date,user_id) VALUES (?,?,?,?)`,
      [title, description, due_date, id],
      (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        return res.status(200).json({
          message: "Submitted Successfully",
        });
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const updateTodo = async (
  req: {
    body: {
      id: string;
      title: string;
      description: string;
      due_date: string;
    };
  },
  res: any
) => {
  const { id, title, description, due_date } = req.body;
  try {
    await db.run(
      `UPDATE Todo SET title=?, description=?, due_date=? where id=?`,
      [title, description, due_date, id]
    );
    return res.status(200).json({
      message: "Updated Successfully",
      toDo: req.body,
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      message: "Update failed",
      toDo: req.body,
    });
  }
};
const bulkGetTodo = async (
  req: {
    query: any;
    headers: any;
    body: {
      token: any;
      id: string[];
    };
  },
  res: any
) => {
  console.log("bulk get todo");

  const { id = [] } = req.body;
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"].split(" ")[1];
  const user_id = await auth.validateToken(token);
  try {
    await db.all(
      //   id.length > 0 ? "Select * from Todo where id in ?" :
      "Select id,title,description,due_date from Todo where user_id=?",
      [user_id], //   [
      //     `(${id
      //       .map((value, index) => {
      //         console.log(id.length !== 1 && id.length - 1 !== index);
      //         return `${value}${
      //           id.length !== 1 && id.length - 1 !== index ? "," : ""
      //         }`;
      //       })
      //       .join("")})`,
      //   ],
      async (err: any, rows: any) => {
        if (!err) {
          return res.status(200).json({
            message: "Submitted Successfully",
            toDo: rows,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const getTodo = async (
  req: {
    params: {
      id: string;
    };
  },
  res: any
) => {
  console.log("get todo", req.params);

  const { id } = req.params;
  try {
    return db.each(
      "Select * from Todo where id = ?",
      [id],
      (err: any, row: any) => {
        if (err) {
          res.status(200).json({
            message: "Not found",
            toDo: null,
          });
        }
        console.log(row);

        return res.status(200).json({
          message: "Submitted Successfully",
          toDo: row,
        });
      }
    );
  } catch (err) {
    console.error(err);
  }
};
const deleteTodo = async (
  req: {
    params: {
      id: string;
    };
  },
  res: any
) => {
  console.log("delete todo", req.params);

  const { id } = req.params;
  try {
    return db.run(
      "Delete from Todo where id = ?",
      [id],
      (err: any, row: any) => {
        if (err) {
          res.status(200).json({
            message: "Not found",
            toDo: null,
          });
        }
        return res.status(200).json({
          message: "Deleted Successfully",
          toDo: row,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(200).json({
      message: "Not found",
      toDo: null,
    });
  }
};
export { addTodo, updateTodo, getTodo, deleteTodo, bulkGetTodo };
