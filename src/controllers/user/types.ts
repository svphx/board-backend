import { MiddlewareFunction } from "shared";

export interface IUserHttpController {
  createUser: MiddlewareFunction;
  authorizeUser: MiddlewareFunction;
  getUserById: MiddlewareFunction;
}
