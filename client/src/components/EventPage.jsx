import React, { useState, useEffect } from "react";
import Chat from "./Chat";

const EventPage = (props) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    setEvent(props.event);
  }, []);

  const addUserToEvent = async () => {
    try {
      const eventId = event._id;

      const userId = localStorage.getItem("userId");

      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        console.log("User added to the event successfully");
        setEvent(await response.json());
      } else {
        console.error("Failed to add user to the event");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div>
        <>
          {event && (
            <>
              <div style={{ float: "left" }}>
                <h2>{event.name}</h2>
                <p><b>Host:</b> {event.host}</p>
                <p><b>Description</b>: {event.description}</p>
                <p><b>Location:</b> {event.location}</p>
                <p><b>Date:</b> {event.date}</p>
                <p><b>Price:</b> {event.price}</p>
                <p>
                 <b> Attendees:</b>{" "}
                  {event.attendees.map((person) => (
                     <div key={person.id} className="event-attendees">
                    <span style={{fontWeight:'bold'}}>{person.name}</span>
                    <img src={person.picture} style={{width:'10vw'}} />     
                     </div>
                  ))}
                </p>
                <button onClick={addUserToEvent}>Join this Event</button>
              </div>
              <Chat event={event} />
            </>
          )}
        </>
      </div>
    </>
  );
};

export default EventPage;
