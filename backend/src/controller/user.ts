import dbConnect = require("../db/connects");
import encryptPassword = require("../utils/encryptPassword");
const db = dbConnect.db;
import auth = require("../auth");

const registerUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password is empty",
      loginUser: false,
    });
  }
  const encrypted = await encryptPassword.encryptPassword(password!);
  try {
    await db.run(`INSERT INTO Users(email,password) VALUES (?,?)`, [
      email,
      encrypted,
    ]);
    db.each("Select id from Users where email=?", [email], (err, row) => {
      if (err) {
        return res.status(200).json({
          message: "db fault",
          loginUser: false,
        });
      }
      //@ts-ignore
      const token = auth.createToken(row?.id);

      return res.status(200).json({
        message: "User Registered",
        loginUser: true,
        token,
      });
    });
  } catch (err) {
    console.error(err);
  }
};
const loginUser = async (
  req: {
    body: {
      email?: string;
      password?: string;
    };
  },
  res: any
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password is empty",
      loginUser: false,
    });
  }
  console.log("login", email);
  try {
    return await db.all(
      `SELECT id,password FROM Users where email=?`,
      [email],
      async (err: any, rows: any) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid Credentials",
            loginUser: false,
          });
        }
        if (rows.length === 0) {
          return res.status(400).json({
            message: "Invalid Credentials",
            loginUser: false,
          });
        }
        const isPassword = await encryptPassword.checkIfHasMatches(
          rows[0]?.password,
          password!
        );
        const token = auth.createToken(rows[0]?.id);

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
