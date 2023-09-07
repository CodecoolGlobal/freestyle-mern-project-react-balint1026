import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userModel from "./model/User.js";
import eventModel from "./model/Event.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8u3exxo.mongodb.net/project`)
    app.listen(3000, () => console.log("Server started on port 3000"));
    console.log('mongo is connected')
    //loadAttendeesIntoEveryEvent();
    //loadUserIdsIntoEvents();
  } catch (err) {
    console.error('Mongo cant connect: ', err)
  };
}

app.use(express.json());

start()

//User Endpoint

//get all users
app.get('/api/users', (req, res) => {
  userModel.find(req.query.username ? { username: req.query.username } : {})
    .sort({ username: 1 })
    .then(users => res.status(200).json(users));
})

app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await userModel.find({ username: req.params.username });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
})

//-- get a user
app.get('/api/users/:id', (req, res) => {
  userModel.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the document" })
    });
});

//Create new User
app.post('/api/users', (req, res) => {
  userModel.create(req.body)
    .then(res.status(201).json("User created"))
    .catch(res.status(500).json({ error: "Could not create document" }))
})

//update user
app.patch('/api/users/:id', (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((user) => res.status(200).json(user))
    .catch(() => {
      res.status(500).json({ error: "Could not update the document" })
    });
});

//Delete user
app.delete('/api/users/:id', (req, res) => {
  userModel.findByIdAndDelete(req.params.id)
    .then(res.status(200).json("User deleted"))
    .catch(res.status(500).json({ error: "Could not delete the document" }))
});

//

//Login / register Enpoints

app.get('/api/login', (req, res) => {
  userModel.find({ username: req.query.username, password: req.query.password })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json("Could not fetch the document"))
})

app.post('/api/register', async (req, res) => {
  const { username, password, age, name, picture } = req.body;
  userModel.findOne({ username: username }).then(result => {
    if (result) {
      res.status(200).json(result);
    }
    else {
      userModel.create({
        name: name,
        age: Number(age),
        username: username,
        password: password,
        picture: picture,
        attending: []
      })
        .then(user => res.status(201).json(null))
        .catch(() => res.status(500).json({ error: "Could not create document" }))
    }
  });

  /*
  /**/
})

app.post('/api/events', async (req, res) => {
  try {
    const { host, name, description, attendees, location, date, price } = req.body;

    const newEvent = new eventModel({
      host,
      name,
      description,
      attendees,
      location,
      date,
      price,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await eventModel.find({}).populate('attendees');
    res.send(events);
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/events/:id', (req, res) => {
  eventModel.findById(req.params.id)
    .then(event => { res.status(200).json(event) })
    .catch(() => { res.status(500) });
});

/*
async function loadAttendeesIntoEveryEvent() {
  const events = await Event.find({});
  const users = await User.find({});

  for (const user of users) {
    let userEvents = (await User.findById(user._id)).attending;
    if (userEvents[0] === '') {
      userEvents = [];
    }

    for (let i = 0; i < Math.floor(Math.random() * 7); i++) {
      const eventIdToPush = events[Math.floor(Math.random() * events.length)]._id;

      if (!userEvents.includes(eventIdToPush)) {
        userEvents.push(eventIdToPush);
      }
    }

    await User.findByIdAndUpdate(user._id, { $set: {attending: userEvents} });
  }
}
*/

/*
async function loadUserIdsIntoEvents() {
  const events = await Event.find({});
  const users = await User.find({});

  for (const user of users) {
    for (const eventId of user.attending) {
      const eventAttendees = (await Event.findById(eventId)).attendees;

      if (!eventAttendees.includes(user._id)) {
        eventAttendees.push(user._id);
        await Event.findByIdAndUpdate(eventId, { $set: {attendees: eventAttendees} });
      }
    }
  } 
}
*/
