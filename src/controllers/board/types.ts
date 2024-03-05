import { MiddlewareFunctionWithAuthData } from "shared";

export interface IBoardHttpController {
  createBoard: MiddlewareFunctionWithAuthData;
  editBoard: MiddlewareFunctionWithAuthData;
  deleteBoard: MiddlewareFunctionWithAuthData;
  getBoard: MiddlewareFunctionWithAuthData;

  addUserToBoard: MiddlewareFunctionWithAuthData;
  removeUserFromBoard: MiddlewareFunctionWithAuthData;

  createColumn: MiddlewareFunctionWithAuthData;
  editColumn: MiddlewareFunctionWithAuthData;
  deleteColumn: MiddlewareFunctionWithAuthData;
}
