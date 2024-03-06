import { IBoardService, boardService } from "services";
import {
  MiddlewareFunctionWithAuthData,
  messageText,
  statusCodes,
} from "shared";

import { IBoardHttpController } from "./types";

class BoardHttpController implements IBoardHttpController {
  constructor(private readonly service: IBoardService) {}

  createBoard: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const board = await this.service.createBoard({
        name: req.body.name as string,
        participants: [req.user?.id as string],
      });
      res.status(statusCodes.createdStatusCode).send({ board });
    } catch (e) {
      next(e);
    }
  };
  getBoard: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const board = await this.service.getBoardById(req.params.boardId);
      res.status(statusCodes.okStatusCode).send({ board });
    } catch (e) {
      next(e);
    }
  };
  editBoard: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const board = await this.service.editBoard({
        name: req.body.name,
        boardId: req.params.boardId,
      });
      res.status(statusCodes.okStatusCode).send({ board });
    } catch (e) {
      next(e);
    }
  };
  deleteBoard: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      await this.service.deleteBoard(req.params.boardId);
      res
        .status(statusCodes.okStatusCode)
        .send({ message: messageText.boardDeleted });
    } catch (e) {
      next(e);
    }
  };

  addUserToBoard: MiddlewareFunctionWithAuthData = async (req, res) => {};
  removeUserFromBoard: MiddlewareFunctionWithAuthData = async (req, res) => {};

  createColumn: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const board = await this.service.createColumn({
        name: req.body.name,
        boardId: req.params.boardId,
      });
      res.status(statusCodes.okStatusCode).send({ board });
    } catch (e) {
      next(e);
    }
  };
  editColumn: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const board = await this.service.editColumn({
        name: req.body.name,
        boardId: req.params.boardId,
        columnId: req.params.columnId,
      });

      res.status(statusCodes.okStatusCode).send({ board });
    } catch (e) {
      next(e);
    }
  };
  deleteColumn: MiddlewareFunctionWithAuthData = async (req, res, next) => {
    try {
      const board = await this.service.deleteColumn({
        boardId: req.params.boardId,
        columnId: req.params.columnId,
      });

      res.status(statusCodes.okStatusCode).send({ board });
    } catch (e) {
      next(e);
    }
  };
}

export const boardHttpController = new BoardHttpController(boardService);
