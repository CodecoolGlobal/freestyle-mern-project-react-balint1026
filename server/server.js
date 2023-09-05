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

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8u3exxo.mongodb.net/project`)
        app.listen(3000, () => console.log("Server started on port 3000"));
        console.log('mongo is connected')
        addSampleEvents()
    } catch(err) {
        console.err('Mongo cant connect: ', err)
        handleError(err)
        };
}

app.use(express.json());

const events = [
    {
      "name": "River Cruise Party",
      "description": "Sail along the Danube with your friends on the Esztergom River Cruise Party. Enjoy music, drinks, and breathtaking views.",
      "location": "Esztergom, Hungary",
      "date": "2023-09-16",
      "price": 3800
    },
    {
      "name": "Jazz Festival",
      "description": "Immerse yourself in the world of jazz at the Pécs Jazz Festival. Groove to the rhythm with your friends.",
      "location": "Pécs, Hungary",
      "date": "2023-09-30",
      "price": 3200
    },
    {
      "name": "Autumn Fair",
      "description": "Experience the charm of autumn at the Debrecen Autumn Fair. Shop for local crafts and indulge in seasonal treats with your friends.",
      "location": "Debrecen, Hungary",
      "date": "2023-10-07",
      "price": 2200
    },
    {
      "name": "Wine and Cheese Tasting",
      "description": "Savor the flavors of wine and cheese at the Sopron Wine and Cheese Tasting event. Delight in a delightful pairing with your friends.",
      "location": "Sopron, Hungary",
      "date": "2023-10-21",
      "price": 2900
    },
    {
      "name": "Christmas Market Opening",
      "description": "Celebrate the start of the holiday season at the Budapest Christmas Market Opening. Enjoy festive lights, crafts, and hot mulled wine with your friends.",
      "location": "Budapest, Hungary",
      "date": "2023-11-10",
      "price": 1500
    },
    {
      "name": "Ice Skating Gala",
      "description": "Glide gracefully on the ice at the Székesfehérvár Ice Skating Gala. A night of elegant skating awaits you and your friends.",
      "location": "Székesfehérvár, Hungary",
      "date": "2023-11-18",
      "price": 2100
    },
    {
      "name": "International Film Festival",
      "description": "Explore world cinema at the Miskolc International Film Festival. Watch compelling films and engage in discussions with your friends.",
      "location": "Miskolc, Hungary",
      "date": "2023-11-30",
      "price": 2800
    },
    {
      "name": "Christmas Carol Sing-Along",
      "description": "Join in a heartwarming Christmas carol sing-along in Győr. Spread holiday cheer with your friends.",
      "location": "Győr, Hungary",
      "date": "2023-12-15",
      "price": 1800
    },
    {
      "name": "New Year's Eve Fireworks Show",
      "description": "Count down to the New Year with a spectacular fireworks display in Debrecen. Welcome 2024 with your friends in style.",
      "location": "Debrecen, Hungary",
      "date": "2023-12-31",
      "price": 4200
    },
    {
      "name": "Winter Carnival",
      "description": "Experience the magic of winter at the Szombathely Winter Carnival. Enjoy ice sculptures, snow activities, and warm drinks with your friends.",
      "location": "Szombathely, Hungary",
      "date": "2023-12-22",
      "price": 2600
    },
    {
      "name": "Rocktober Music Festival",
      "description": "Get ready to rock at the Rocktober Music Festival. Live bands, great food, and a fantastic atmosphere await you and your friends.",
      "location": "Budapest, Hungary",
      "date": "2023-09-29",
      "price": 3800
    },
    {
      "name": "Fall Harvest Picnic",
      "description": "Celebrate the beauty of autumn with a Fall Harvest Picnic. Enjoy a day outdoors with your friends, complete with delicious seasonal treats.",
      "location": "Eger, Hungary",
      "date": "2023-10-14",
      "price": 2500
    },
    {
      "name": "Halloween Horror House",
      "description": "Prepare for a spine-tingling experience at the Halloween Horror House. Challenge your bravery with your friends in this haunted attraction.",
      "location": "Debrecen, Hungary",
      "date": "2023-10-31",
      "price": 3200
    },
    {
      "name": "Wine and Art Evening",
      "description": "Sip on fine wines and appreciate local art at the Wine and Art Evening. Share the beauty of both with your friends.",
      "location": "Szentendre, Hungary",
      "date": "2023-11-11",
      "price": 2800
    },
    {
      "name": "Festive Ice Skating",
      "description": "Glide gracefully on the ice at the Festive Ice Skating rink. Enjoy the enchanting atmosphere with your friends.",
      "location": "Győr, Hungary",
      "date": "2023-11-25",
      "price": 2000
    },
    {
      "name": "Christmas Craft Fair",
      "description": "Find unique handmade gifts at the Christmas Craft Fair. Share the joy of holiday shopping with your friends.",
      "location": "Szeged, Hungary",
      "date": "2023-12-02",
      "price": 1800
    },
    {
      "name": "New Year's Eve Gala Dinner",
      "description": "Welcome the new year in style at the New Year's Eve Gala Dinner. Enjoy gourmet cuisine, music, and dancing with your friends.",
      "location": "Budapest, Hungary",
      "date": "2023-12-31",
      "price": 4500
    },
    {
      "name": "Snowball Fight Tournament",
      "description": "Embrace the winter spirit and participate in the Snowball Fight Tournament. Compete and have a blast with your friends.",
      "location": "Székesfehérvár, Hungary",
      "date": "2023-12-16",
      "price": 2200
    },
    {
      "name": "Hungarian Cultural Festival",
      "description": "Celebrate the rich cultural heritage of Hungary at the Hungarian Cultural Festival. Enjoy music, dance, and traditional cuisine with your friends.",
      "location": "Pécs, Hungary",
      "date": "2023-09-23",
      "price": 3200
    },
    {
      "name": "Sopron Wine and Music Night",
      "description": "Indulge in the harmonious combination of wine and music at the Sopron Wine and Music Night. Enjoy a delightful evening with your friends.",
      "location": "Sopron, Hungary",
      "date": "2023-10-07",
      "price": 2800
    },
    {
      "name": "Friday Night Pub Crawl",
      "description": "Kick off the weekend with your friends on a Friday Night Pub Crawl. Explore the best pubs and enjoy a night of laughter and drinks.",
      "location": "Budapest, Hungary",
      "date": "2023-09-08",
      "price": 2500
    },
    {
      "name": "Movie Night Under the Stars",
      "description": "Grab your blankets and join us for a Movie Night Under the Stars. Watch your favorite films in the open air with your friends.",
      "location": "Debrecen, Hungary",
      "date": "2023-09-15",
      "price": 1800
    },
    {
      "name": "Beer Tasting and Board Games",
      "description": "Unwind with your friends over a Beer Tasting and Board Games night. Try a variety of craft beers and compete in fun board games.",
      "location": "Szeged, Hungary",
      "date": "2023-10-05",
      "price": 2800
    },
    {
      "name": "Karaoke Party",
      "description": "Take the stage and sing your heart out at the Karaoke Party. Belt out your favorite tunes with your friends by your side.",
      "location": "Pécs, Hungary",
      "date": "2023-10-14",
      "price": 2000
    },
    {
      "name": "Budapest Street Food Festival",
      "description": "Satisfy your taste buds at the Budapest Street Food Festival. Explore a world of flavors with your friends in the heart of the city.",
      "location": "Budapest, Hungary",
      "date": "2023-10-21",
      "price": 2200
    },
    {
      "name": "Coffee and Art Gallery Tour",
      "description": "Start your day with a Coffee and Art Gallery Tour. Sip on coffee and explore local art with your friends.",
      "location": "Székesfehérvár, Hungary",
      "date": "2023-11-04",
      "price": 1600
    },
    {
      "name": "Craft Beer and Comedy Night",
      "description": "Combine laughter and craft beer at the Craft Beer and Comedy Night. Enjoy stand-up comedy with your friends and great brews.",
      "location": "Debrecen, Hungary",
      "date": "2023-11-18",
      "price": 3000
    },
    {
      "name": "Sunday Brunch and Jazz",
      "description": "Indulge in a delightful Sunday Brunch and Jazz session. Enjoy brunch cuisine and soothing jazz music with your friends.",
      "location": "Eger, Hungary",
      "date": "2023-12-03",
      "price": 2400
    },
    {
      "name": "Game Night at the Park",
      "description": "Bring your board games and join us for a Game Night at the Park. Challenge your friends to friendly competitions in a relaxed setting.",
      "location": "Szombathely, Hungary",
      "date": "2023-12-09",
      "price": 1500
    },
    {
      "name": "Christmas Movie Marathon",
      "description": "Get into the holiday spirit with a Christmas Movie Marathon. Watch classic holiday films with your friends and share festive snacks.",
      "location": "Győr, Hungary",
      "date": "2023-12-16",
      "price": 1800
    }
  ];

  async function addSampleEvents() {
    const users = await User.find({});
    for (let i = 0; i < events.length; i++) {
        const eventHost = users[Math.floor(Math.random() * 200)].username;
        await Event.create({
            name: events[i].name,
            host: eventHost,
            description: events[i].description,
            location: events[i].location,
            date: events[i].date,
            price: events[i].price,
        })
        console.log(eventHost)
    }
  }
start()

