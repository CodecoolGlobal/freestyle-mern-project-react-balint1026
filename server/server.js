import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./model/User.js";
import Event from "./model/Event.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://Apolder:CKMKKp12rQZGyaxa@cluster.8u3exxo.mongodb.net/project?retryWrites=true&w=majority`);

app.use(express.json());

//User Endpoint

//get all users
app.get('/api/users', (req, res) => {
    console.log("happeb");
    User.find({}).sort({ username: 1 }).then(users => res.status(200).json(users));
    
})

//-- get a user
app.get('/api/users/:id', (req, res) => {
    User.findById(req.query.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(500).json({ error: "Could not fetch the document" })
        });
});
//update user
app.patch('/api/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.query.id, { $set: req.body.user })
        .then((user) => res.status(200).json(user))
        .catch(() => {
            res.status(500).json({ error: "Could not update the document" })
        });
});

//

app.listen(3000, () => console.log("Server started on port 3000"));
