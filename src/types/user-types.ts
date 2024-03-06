import { Document } from "mongoose";

export type User = Document & {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
};

export type UserDto = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
};

export type AddUserDto = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
};
