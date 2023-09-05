import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  age: Number,
  username: String,
  password: String,
  picture: String,
  attending: [String]
});

export default model('User', userSchema);