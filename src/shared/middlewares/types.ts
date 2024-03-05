import { Request, Response, NextFunction } from "express";
import { ApiError } from "shared/errors";

export type MiddlewareFunction = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export type ErrorMiddlewareFunction = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export type MiddlewareFunctionWithAuthData = (
  request: Request & {
    user?: {
      id: string;
    };
  },
  response: Response,
  next: NextFunction
) => void;
