import jwt = require("jsonwebtoken");
const createToken = (value: string): string => {
  return jwt.sign({ value }, process.env.SECRET_KEY || "Stack", {
    expiresIn: process.env.TOKEN_LIFESPAN,
  });
};

const validateToken = async (value: string): Promise<any> => {
  const email = await jwt.verify(value, process.env.SECRET_KEY || "Stack");
  console.log(email);
  ///@ts-ignore
  if (email) return email?.value;
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
