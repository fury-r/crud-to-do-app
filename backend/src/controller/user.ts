import { QueryResultRow } from "pg";
import { dbpg } from "../db/connects";
import { checkIfHasMatches, encryptPassword } from "../utils/encryptPassword";
import { createToken } from "../auth";
import { Response, Request } from "express";

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password is empty",
      loginUser: false,
    });
  }
  const encrypted = await encryptPassword(password!);
  try {
    await dbpg.query(
      `INSERT INTO users(email,password) VALUES ($1,$2)`,
      [username, encrypted],
      (err: Error, resultSet: any) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send({ message: "Internal Server Error.Please try again later." });
        }
        return resultSet;
      }
    );
    await dbpg.query(
      "SELECT * FROM users WHERE id = lastval()",
      (err: Error, result: QueryResultRow) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send({ message: "Internal Server Error.Please try again later." });
        }
        if (result) {
          res.status(200).send({
            message: "User registered",
            token: createToken(result.insertId),
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password is empty",
      loginUser: false,
    });
  }
  console.log("login", username);
  try {
    return await dbpg.query(
      `SELECT id,password FROM Users where email=$1`,
      [username],
      async (err: any, result: QueryResultRow) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid Credentials",
            loginUser: false,
          });
        }
        if (result.rows.length === 0) {
          return res.status(400).json({
            message: "Invalid Credentials",
            loginUser: false,
          });
        }
        const isPassword = await checkIfHasMatches(
          result.rows[0]?.password,
          password!
        );
        const token = createToken(result.rows[0]?.id);

        if (isPassword) {
          return res.status(200).json({
            message: "User Login Succesfull",
            loginUser: true,
            token,
          });
        }
        return res.status(400).json({
          message: "Invalid Credentials",
          loginUser: false,
        });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "Invalid Credentials",
      loginUser: false,
    });
  }
};

export { loginUser, registerUser };
