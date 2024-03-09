import { Schema, model } from "mongoose";

import { User } from "@src/types/user-types";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 8 },
    fullName: { type: String, required: true, minLength: 3 },
    phoneNumber: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    role: {
      type: String,
      enum: Role,
      default: Role.USER,
    },
  },
  { collection: "User" }
);

export default model<User>("User", userSchema);
