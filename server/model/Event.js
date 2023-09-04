import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  name: String,
  description: String,
  attendees: [String],
  location: String,
  date: Date,
  price: Number
});

export default model('Event', eventSchema);