import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (email: string) => {
          const emailRegex = /\S+@\S+\.\S+/;
          return emailRegex.test(email);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    password: { type: String, required: true, minlength: 6 },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { collection: "User" }
);

const User = model("User", userSchema);

export default User;
