import express from "express";
import { errors } from "celebrate";
import { createNotFoundError, errorText } from "shared";

import { userRouter, boardRouter } from "./routers";

export const appRouter = express.Router();

appRouter.use(userRouter);
appRouter.use(boardRouter);
appRouter.use(errors());
appRouter.use(() => {
  throw createNotFoundError(errorText.notFound.routeNotFound);
});
