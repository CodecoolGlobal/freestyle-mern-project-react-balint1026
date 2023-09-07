import { useState } from "react";
import cityData from "../../../server/hu.json";

const EventCreation = (props) => {
  console.log(cityData);
  const cities = cityData;
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "", 
    date: "",
    price: "",
  });
  const [isEventCreated, setIsEventCreated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      host: localStorage.getItem("username"),
      name: eventData.name,
      description: eventData.description,
      attendees: [],
      location: eventData.location  == '' ? 'Budapest, Hungary': eventData.location,
      date: eventData.date,
      price: Number(eventData.price),
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        console.log("Event created successfully");
        setIsEventCreated(true)
       setTimeout(() => {props.handleEventAddingDone()}, 2500)

      } else {
        console.log(newEvent);
        console.error("Event creation failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="event-creation">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label><b>Name:</b></label>
          <br />
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label><b>Description:</b></label>
          <br />
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label><b>Location:</b></label>
          <br />
          <select
          className="location-select"
            name="location"
            value={eventData.location + ', Hungary'}
            onChange={handleInputChange}
            required
          >
            {cities.map((item) => (
              <option key={item.city} value={item.city}>
                {item.city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label><b>Date:</b></label>
          <br />
          <input
            type="text"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label><b>Price:</b></label>
          <br />
          <input
            type="text"
            name="price"
            value={eventData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button className="eventcreate-button" type="submit">Create Event</button>
        </div>
        {isEventCreated && (<h3 style={{color:"green"}} >Event created! Redirecting you to main page...</h3>)}
      </form>
    </div>
  );
};

export default EventCreation;
