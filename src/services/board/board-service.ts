import { Model } from "mongoose";
import { type Board, BoardModel } from "db";
import { createNotFoundError, errorText } from "shared";

import {
  IBoardService,
  CreateBoardDto,
  EditBoardDto,
  IdsDto,
  CreateColumnDto,
  EditColumnDto,
} from "./types";

class BoardService implements IBoardService {
  constructor(private readonly model: Model<Board>) {}

  async createBoard(dto: CreateBoardDto) {
    return await this.model.create({ ...dto });
  }
  async editBoard(dto: EditBoardDto) {
    return await this.model
      .findByIdAndUpdate(dto.boardId, { name: dto.name }, { new: true })
      .orFail(createNotFoundError(errorText.notFound.boardNotFound));
  }
  async deleteBoard(id: string) {
    await this.model
      .findByIdAndDelete(id)
      .orFail(createNotFoundError(errorText.notFound.boardNotFound));
  }
  async getBoardById(id: string) {
    return await this.model
      .findById(id)
      .orFail(createNotFoundError(errorText.notFound.boardNotFound));
  }
}

export const boardService = new BoardService(BoardModel);
