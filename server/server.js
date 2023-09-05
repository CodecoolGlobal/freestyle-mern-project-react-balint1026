import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./model/User.js";
import Event from "./model/Event.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8u3exxo.mongodb.net/project`)
    app.listen(3000, () => console.log("Server started on port 3000"));
    console.log('mongo is connected')
  } catch (err) {
    console.error('Mongo cant connect: ', err)
  };
}

app.use(express.json());


start()

//User Endpoint

//get all users
app.get('/api/users', (req, res) => {
  User.find(req.body)
  .sort({ username: 1 })
  .then(users => res.status(200).json(users))
})

//-- get a user
app.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the document" })
    });
});

//update user
app.patch('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((user) => res.status(200).json(user))
    .catch(() => {
      res.status(500).json({ error: "Could not update the document" })
    });
});

//



