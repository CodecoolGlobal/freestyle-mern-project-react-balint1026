import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  host: String,
  name: String,
  description: String,
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  location: String,
  date: String,
  price: Number
});

export default model('Event', eventSchema);