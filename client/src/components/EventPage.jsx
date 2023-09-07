import React, { useState, useEffect } from "react";

const EventPage = (props) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    setEvent(props.event);
    console.log(props.event);
  }, []);
  return (
    <div>
      <>
        {event && (
          <>
            <h2>{event.name}</h2>
            <p>Host: {event.host}</p>
            <p>Description: {event.description}</p>
            <p>Location: {event.location}</p>
            <p>Date: {event.date}</p>
            <p>Price: {event.price}</p>
            <p>Attendees: {event.attendees.map((person) => (
                <span key={person._id}>{person.name}</span>
            ))}</p>
          </>
        )}
      </>
    </div>
  );
};

export default EventPage;
