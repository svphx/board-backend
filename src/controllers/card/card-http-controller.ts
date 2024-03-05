import { MiddlewareFunction } from "shared";
import { ICardHttpController } from "./types";

class CardHttpController implements ICardHttpController {
  constructor(private readonly service: any) {}

  createCard: MiddlewareFunction = async (req, res) => {};
  getCard: MiddlewareFunction = async (req, res) => {};
  editCard: MiddlewareFunction = async (req, res) => {};
  deleteCard: MiddlewareFunction = async (req, res) => {};
}

export const cardHttpController = new CardHttpController({});
