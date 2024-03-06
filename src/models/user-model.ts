import { Schema, model } from "mongoose";

import { User } from "@src/types/user-types";

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
  },
  { collection: "User" }
);

export default model<User>("User", userSchema);
