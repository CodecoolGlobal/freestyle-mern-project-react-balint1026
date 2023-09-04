import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  attending: [String]
});

export default model('User', userSchema);