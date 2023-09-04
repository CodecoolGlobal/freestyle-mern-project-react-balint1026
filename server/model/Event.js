import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  name: String,
  description: String,
  attendees: [Number],
  location: String,
  price: Number,
  createdAt: Date
});

export default model('Event', eventSchema);