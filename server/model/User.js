import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  attending: [Number],
  createdAt: Date
});

export default model('User', userSchema);