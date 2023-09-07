import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  age: Number,
  username: {type:String, unique: true},
  password: String,
  picture: String,
  attending: [{type: String}]
});

export default model('User', userSchema);