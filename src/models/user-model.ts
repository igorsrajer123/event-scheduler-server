import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String,
    },
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

const User = model("User", userSchema);

export default User;
