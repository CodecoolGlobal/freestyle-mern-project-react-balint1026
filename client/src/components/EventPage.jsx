import React, { useState, useEffect } from "react";
import Chat from './Chat';

const EventPage = (props) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    setEvent(props.event);
  }, []);

  const addUserToEvent = async () => {
    try {
      const eventId= event._id;

      const userId = localStorage.getItem('userId');

      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (response.ok) {
        console.log('User added to the event successfully');
        setEvent(await response.json());

      } else {
        console.error('Failed to add user to the event');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <>
      <div>
        <>
          {event && (
            <>
              <div style={{ float: 'left' }}>
                <h2>{event.name}</h2>
                <p>Host: {event.host}</p>
                <p>Description: {event.description}</p>
                <p>Location: {event.location}</p>
                <p>Date: {event.date}</p>
                <p>Price: {event.price}</p>
                <p>Attendees: {event.attendees.map((person) => (
                  <span key={person._id}>{person.name}</span>
                ))}</p>
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
