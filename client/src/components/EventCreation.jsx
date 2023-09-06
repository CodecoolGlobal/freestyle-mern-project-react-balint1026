import { useState } from 'react';

const EventCreation = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      host: localStorage.getItem('userId'),
      name: eventData.name,
      description: eventData.description,
      attendees: [],
      location: eventData.location,
      date: eventData.date,
      price: Number(eventData.price),
    };

    try { 
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        console.log('Event created successfully');
      } else {
        console.log(newEvent);
        console.error('Event creation failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={eventData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default EventCreation;