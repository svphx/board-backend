import { Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type User, UserModel } from "db";
import {
  createBadRequestError,
  createConflictError,
  createUnauthorizedError,
  errorText,
} from "shared";

import { IUserService } from "./types";
import { AuthorizeUserDto, CreateUserDto } from "./dto";

class UserService implements IUserService {
  constructor(private readonly model: Model<User>) {}

  async createUser(dto: CreateUserDto) {
    //проверяем уникальность имени и почты, если что-то уже используется, будет вброшена ошибка
    await this.checkUniqueField("name", dto.name, errorText.conflict.name);
    await this.checkUniqueField("email", dto.email, errorText.conflict.email);
    //если все ок, генерируем хеш пароля
    const { SALT = 10 } = process.env;
    const hash = await bcrypt.hash(dto.password, +SALT);
    //создаем пользователя и возвращаем его
    return await this.model.create({ ...dto, password: hash });
  }

  async authorizeUser(dto: AuthorizeUserDto) {
    //ищем пользователя по почте, если не находим, вбрасываем ошибку
    const user = await this.model
      .findOne({ email: dto.email })
      .select("+password")
      .orFail(
        createUnauthorizedError(errorText.notAuthorized.wrongCredentials)
      );
    //если нашли, сверяем присланный пароль и хеш из бд
    const isPasswordMatched = await bcrypt.compare(dto.password, user.password);
    //если они не совпадают, вбрасываем ошибку
    if (!isPasswordMatched) {
      throw createUnauthorizedError(errorText.notAuthorized.wrongCredentials);
    }
    //если все ок, создаем токен, вшиваем в него id пользователя и возвращаем токен
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "e5941b231be3be054dcec54b7cf2f9f7",
      {
        expiresIn: "2d",
      }
    );

    return token;
  }

  //метод для проверки уникальных полей у пользователя в бд
  async checkUniqueField(field: string, value: string, errorMessage: string) {
    //ищем юзера по указанному полю, метод findOne должен вернуть null, если он не будет найден
    const user = await this.model.findOne({ [field]: value });
    //вбрасываем ошибку, если пользователь был найден
    if (user) {
      throw createConflictError(errorMessage);
    }
  }

  async getUserById(id: string) {
    return await this.model
      .findById(id)
      .orFail(createBadRequestError(errorText.badRequest.invalidUserId));
  }
}

export const userService = new UserService(UserModel);
