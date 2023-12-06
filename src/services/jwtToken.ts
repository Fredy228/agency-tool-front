import jwt from "jsonwebtoken";

export const generateJwtToken = (payload: Object): string => {
  const secret = process.env.NEXTAUTH_SECRET!;

  return jwt.sign(payload, secret, { expiresIn: "3d" });
};

export const decodeJwtToken = (token: string): jwt.JwtPayload | null => {
  return jwt.decode(token, { json: true });
};
