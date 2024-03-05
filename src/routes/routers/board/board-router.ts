import express from "express";

import { boardHttpController } from "controllers";
import { authMiddleware } from "shared";
import {
  createBoardValidation,
  deleteBoardValidation,
  editBoardValidation,
  getBoardByIdValidation,
} from "./board-router-validation";

export const boardRouter = express.Router();

boardRouter.use(authMiddleware);

boardRouter.post(
  "/board",
  createBoardValidation,
  boardHttpController.createBoard
); //создание доски
boardRouter.delete(
  "/board/:boardId",
  deleteBoardValidation,
  boardHttpController.deleteBoard
); //удаление доски
boardRouter.get(
  "/board/:boardId",
  getBoardByIdValidation,
  boardHttpController.getBoard
); //получить доску
boardRouter.put(
  "/board/:boardId",
  editBoardValidation,
  boardHttpController.editBoard
); //изменить доску

boardRouter.put("/board/:boardId/:userId", boardHttpController.addUserToBoard); //добавление юзера на доску
boardRouter.delete(
  "/board/:boardId/:userId",
  boardHttpController.removeUserFromBoard
); //удаление юзера с доски

boardRouter.post("/board/:boardId/column", boardHttpController.createColumn); //добавление колонки на доску
boardRouter.put(
  "/board/:boardId/column/:columnId",
  boardHttpController.editColumn
); //изменение колонки
boardRouter.delete(
  "/board/:boardId/column/:columnId",
  boardHttpController.deleteColumn
); //удаление колонки с доски
