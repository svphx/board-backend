import { MiddlewareFunction } from "shared";

export interface ICardHttpController {
  createCard: MiddlewareFunction;
  getCard: MiddlewareFunction;
  editCard: MiddlewareFunction;
  deleteCard: MiddlewareFunction;
}
