import { Board } from "db";

export interface IBoardService {
  createBoard(dto: CreateBoardDto): Promise<Board | void>;
  editBoard(dto: EditBoardDto): Promise<Board | void | null>;
  getBoardById(id: string): Promise<Board | void>;
  deleteBoard(id: string): void;

  // addUserToBoard(dto: IdsDto): Promise<Board | void | null>;
  // removeUserFromBoard(dto: IdsDto): Promise<Board | void | null>;

  createColumn(dto: CreateColumnDto): Promise<Board | void | null>;
  editColumn(dto: EditColumnDto): Promise<Board | void>;
  deleteColumn(dto: DeleteColumnDto): Promise<Board | void>;
}

export interface CreateBoardDto {
  name: string;
  participants: string[];
}
export interface EditBoardDto {
  boardId: string;
  name: string;
}

export interface IdsDto {
  boardId: string;
  userId: string;
}

export interface CreateColumnDto {
  name: string;
  boardId: string;
}
export interface EditColumnDto {
  name: string;
  boardId: string;
  columnId: string;
}
export interface DeleteColumnDto {
  boardId: string;
  columnId: string;
}
