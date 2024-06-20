import { QueryResultRow } from "pg";
import { validateToken, validateTokenFromHeader } from "../auth";
import { dbpg } from "../db/connects";
import { Request, Response } from "express";
import { getTokerFromHeader } from "../utils/common";

const addTodo = async (req: Request, res: Response) => {
  const { title, description, due_date, status } = req.body;
  try {
    const id = await validateTokenFromHeader(req);
    console.log("user_id", id);
    if (id) {
      await dbpg.query(
        `INSERT INTO Todo(title,description,due_date, status,user_id) VALUES ($1,$2,$3,$4,$5)`,
        [title, description, due_date, status, id],
        (err, result: QueryResultRow) => {
          if (err) {
            console.error(err.message);
            return;
          }
          return res.status(200).json({
            message: "Submitted Successfully",
            row: result.rows[0],
          });
        }
      );
    } else {
      return res.status(401).send({
        message: "Invalid token.",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id, title, description, due_date, status } = req.body;

  try {
    await dbpg.query(
      `UPDATE Todo SET title=$1, description=$2, due_date=$3, status=$4 where id=$5`,
      [title, description, due_date, status, id]
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
const bulkGetTodo = async (req: Request, res: Response) => {
  const user_id = await validateTokenFromHeader(req);
  try {
    const filter = req.query.filter;

    await dbpg.query(
      `Select id,title,description,due_date,status from Todo where user_id=$1${
        filter !== "null" && filter !== "undefined" ? " AND status=$2" : ""
      }`,
      [
        user_id,
        ...(filter !== "null" && filter !== "undefined" ? [filter] : []),
      ],
      async (err: any, result: QueryResultRow) => {
        if (!err) {
          return res.status(200).json({
            message: "Submitted Successfully",
            toDo: result.rows,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const getCompletedTasks = async (req: Request, res: Response) => {
  const token = getTokerFromHeader(req);
};

const getTodo = async (
  req: {
    params: {
      id: string;
    };
  },
  res: Response
) => {
  console.log("get todo", req.params);

  const { id } = req.params;
  try {
    return await dbpg.query(
      "Select * from Todo where id = $1",
      [id],
      (err: any, result: QueryResultRow) => {
        if (err) {
          res.status(200).json({
            message: "Not found",
            toDo: null,
          });
        }

        return res.status(200).json({
          message: "Submitted Successfully",
          toDo: result.rows[0],
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
  res: Response
) => {
  const { id } = req.params;
  try {
    return await dbpg.query(
      "Delete from Todo where id = $1",
      [id],
      (err: any, result: QueryResultRow) => {
        if (err) {
          res.status(200).json({
            message: "Not found",
            toDo: null,
          });
        }
        return res.status(200).json({
          message: "Deleted Successfully",
          toDo: result.rows[0],
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
