import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // validate: (value: string) => validator.isEmail(value),
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { collection: "User" }
);

const User = model("User", userSchema);

export default User;
