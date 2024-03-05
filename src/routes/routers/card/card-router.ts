import express from "express";
import { authMiddleware } from "shared";

export const cardRouter = express.Router();

cardRouter.use(authMiddleware);

cardRouter.post("/board/:boardId/card/"); //добавление карточки на доску
cardRouter.put("/board/:boardId/:cardId"); //изменение карточки
cardRouter.delete("/board/:boardId/card/:cardId"); //удаление карточки с доски
