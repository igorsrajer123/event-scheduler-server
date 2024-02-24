const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value: string) => validator.isEmail(value),
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { collection: "User" }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
