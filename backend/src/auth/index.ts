import jwt = require("jsonwebtoken");
import { getTokerFromHeader } from "../utils/common";
import { Request } from "express";
const createToken = (value: string): string => {
  return jwt.sign({ value }, process.env.JWT_SECRET_KEY || "Stack", {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const validateTokenFromHeader = async (req: Request) => {
  const token = getTokerFromHeader(req);
  if (token) {
    return await validateToken(token);
  }
  return false;
};
const validateToken = async (value: string): Promise<any> => {
  try {
    const token = await jwt.verify(
      value,
      process.env.JWT_SECRET_KEY || "Stack"
    );
    ///@ts-ignore
    if (token) return token?.value;
  } catch (err) {
    console.error(err);
  }
  return false;
};
const isAuthenicatedUser = async (req: any, res: any, next: any) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .send("A token is required for authentication.Please login");
  }
  try {
    await validateToken(token);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export { createToken, validateToken, isAuthenicatedUser };
