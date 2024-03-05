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
      await this.service.createBoard({
        name: req.body.name as string,
        participants: [req.user?.id as string],
      });
      res
        .status(statusCodes.createdStatusCode)
        .send({ message: messageText.boardCreated });
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

  createColumn: MiddlewareFunctionWithAuthData = async (req, res) => {};
  editColumn: MiddlewareFunctionWithAuthData = async (req, res) => {};
  deleteColumn: MiddlewareFunctionWithAuthData = async (req, res) => {};
}

export const boardHttpController = new BoardHttpController(boardService);
