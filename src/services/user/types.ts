import { User } from "db";
import { CreateUserDto, AuthorizeUserDto } from "./dto";

export interface IUserService {
  createUser(dto: CreateUserDto): Promise<User | void>;
  authorizeUser(dto: AuthorizeUserDto): Promise<string | void>;
  checkUniqueField(
    field: string,
    value: string,
    errorMessage: string
  ): Promise<void>;
  getUserById(id: string): Promise<User | void>;
}
