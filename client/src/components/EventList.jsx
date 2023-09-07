import { useEffect, useState } from 'react';
import EventTile from './EventTile';

function EventList(props) {
  const [events, setEvents] = useState([]);

  const eventFilter = props.eventId;

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
      {events && events.map((event) => {
        if (eventFilter) {
          if (eventFilter.includes(event._id)) {
            return (<div key={event._id} className="event-item">
              <EventTile event={event} />
            </div>)
          }
        }
        else {
          return (<div key={event._id} className="event-item" onClick={() => { props.onSelectedEvent(event) }}>
            <EventTile event={event} />
          </div>)
        }
      })}
    </div>
  )
}

export default EventList;
