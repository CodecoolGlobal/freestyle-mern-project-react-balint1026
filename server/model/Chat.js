import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  senderid: String,
  message: String,
  eventid: String,
  name: String
});

export default model('Chat', chatSchema);
