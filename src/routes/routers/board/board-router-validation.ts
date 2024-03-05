import { celebrate, Joi } from "celebrate";

export const createBoardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});
export const getBoardByIdValidation = celebrate({
  params: Joi.object().keys({
    boardId: Joi.string().alphanum().required().hex().length(24),
  }),
});
export const deleteBoardValidation = celebrate({
  params: Joi.object().keys({
    boardId: Joi.string().alphanum().required().hex().length(24),
  }),
});
export const editBoardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
  params: Joi.object().keys({
    boardId: Joi.string().alphanum().required().hex().length(24),
  }),
});
