import { userService, IUserService } from "services/user";
import { MiddlewareFunction } from "shared/middlewares";
import { messageText, statusCodes } from "shared/utils";

import { IUserHttpController } from "./types";

class UserHttpController implements IUserHttpController {
  constructor(private readonly service: IUserService) {}

  createUser: MiddlewareFunction = async (req, res, next) => {
    try {
      await this.service.createUser(req.body);
      res
        .status(statusCodes.createdStatusCode)
        .send({ message: messageText.userCreated });
    } catch (e) {
      next(e);
    }
  };
  authorizeUser: MiddlewareFunction = async (req, res, next) => {
    try {
      const token = await this.service.authorizeUser(req.body);
      res.status(statusCodes.okStatusCode).send({ token: token });
    } catch (e) {
      next(e);
    }
  };
  getUserById: MiddlewareFunction = async (req, res, next) => {
    try {
      const user = await this.service.getUserById(req.params.userId);

      res.status(statusCodes.okStatusCode).send({ user });
    } catch (e) {
      next(e);
    }
  };
  getCurrentUser: MiddlewareFunction = async (req, res, next) => {
    try {
      //@ts-ignore
      const user = await this.service.getUserById(req.user.id);

      res.status(statusCodes.okStatusCode).send({ user });
    } catch (e) {
      next(e);
    }
  };
}

export const userHttpController = new UserHttpController(userService);
