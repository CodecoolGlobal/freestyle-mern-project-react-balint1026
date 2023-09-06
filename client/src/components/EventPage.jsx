import React, { useState, useEffect } from "react";

const EventPage = (props) => {
  const [event, setEvent] = useState({});
useEffect(() => {
    const eventId = props.id;
    fetch(`/api/events/${eventId}`)
    .then((res) => res.json)
    .then((data) => {
        setEvent(data) 
    })
    .catch((err) => {
        console.error(err);
    })
}, [props.id])
  return (
    <div>
      <>
        <h2>{event.name}</h2>
        <p>Host: {event.host}</p>
        <p>Description: {event.description}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>
        <p>Price: {event.price}</p>
        <p>Attendees: {event.attendees}</p>
      </>
    </div>
  );
};

export default EventPage;
