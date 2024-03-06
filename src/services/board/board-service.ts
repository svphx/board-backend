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
  DeleteColumnDto,
} from "./types";

class BoardService implements IBoardService {
  constructor(private readonly model: Model<Board>) {}

  //МЕТОДЫ РАБОТЫ С ДОСКАМИ
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

  // МЕТОДЫ РАБОТЫ С СТОЛБЦАМИ
  async createColumn(dto: CreateColumnDto) {
    return await this.model
      .findByIdAndUpdate(
        dto.boardId,
        {
          $addToSet: {
            columns: { name: dto.name },
          },
        },
        { new: true }
      )
      .orFail(createNotFoundError(errorText.notFound.boardNotFound));
  }
  async editColumn(dto: EditColumnDto) {
    return await this.model
      .findOneAndUpdate(
        { _id: dto.boardId, "columns._id": dto.columnId },
        {
          $set: {
            "columns.$.name": dto.name,
          },
        },
        { new: true }
      )
      .orFail(createNotFoundError(errorText.notFound.boardNotFound));
  }
  async deleteColumn(dto: DeleteColumnDto) {
    return await this.model
      .findByIdAndUpdate(
        dto.boardId,
        {
          $pull: {
            columns: {
              _id: dto.columnId,
            },
          },
        },
        { new: true }
      )
      .orFail(createNotFoundError(errorText.notFound.boardNotFound));
  }
}

export const boardService = new BoardService(BoardModel);
