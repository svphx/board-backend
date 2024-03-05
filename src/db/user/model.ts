import mongoose from "mongoose";
import { User } from "./types";
import { isEmail } from "./helpers";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: { validator: isEmail },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

export const UserModel = mongoose.model<User>("User", userSchema);
