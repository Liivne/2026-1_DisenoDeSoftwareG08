import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

const secret: Secret = JWT_SECRET;

export type JwtPayload = {
  id: number;
  email: string;
  role: string;
};

export function generateAccessToken(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, secret);
}