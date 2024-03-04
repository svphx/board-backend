import jwt from "jsonwebtoken";

import { createUnauthorizedError, errorText } from "shared/errors";

import { MiddlewareFunction } from "./types";

export const authMiddleware: MiddlewareFunction = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createUnauthorizedError(errorText.notAuthorized.tokenExpired);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (e) {
    next(createUnauthorizedError(errorText.notAuthorized.tokenExpired));
  }
  //@ts-ignore
  req.user = payload;
  next();
};
