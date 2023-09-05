import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  host: String,
  name: String,
  description: String,
  attendees: [String],
  location: String,
  date: String,
  price: Number
});

export default model('Event', eventSchema);