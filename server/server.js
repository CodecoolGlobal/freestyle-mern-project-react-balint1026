import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./model/User.js";
import Event from "./model/Event.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8u3exxo.mongodb.net/project`);

app.use(express.json());

//

app.listen(3000, () => console.log("Server started on port 3000"));
