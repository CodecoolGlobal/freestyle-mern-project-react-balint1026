import { useEffect, useState } from 'react';
import EventTile from './EventTile';

function EventList(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('/api/events');
      const events = await response.json();
      setEvents(events);
    }
    fetchEvents();
  }, []);

  return (
    <div className="EventList">
      {events && events.map((event) => (
        <div key={event._id} className="event-item" onClick={() => {props.onSelectedEvent(event._id)}}>
          <EventTile event={event}/>
        </div>
      ))}
    </div>
  )
}

export default EventList;
