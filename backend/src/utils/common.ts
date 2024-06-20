import { Request } from "express";

export const getTokerFromHeader = (req: Request) =>
  req.body.token ||
  req.query.token ||
  req.headers["x-access-token"] ||
  req.headers["authorization"]?.split(" ")[1];
