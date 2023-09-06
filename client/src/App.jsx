import { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import EventCreation from './components/EventCreation';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import logo from './assets/logo.svg';


function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
  }

  function handleAddNewEvent() {
    setIsAddingNewEvent(true);
  }

  return (
    <>
      {isAddingNewEvent ? (
        <EventCreation handelEventAddingDone={() => setIsAddingNewEvent(false)}/>
      ) : (
        <>
          <img className='logo' src={logo} />
          <div className='addEventBtn' onClick={handleAddNewEvent}><p>Add New Event</p></div>
          {selectedEvent ? <EventPage event={selectedEvent} /> : (
            <>
              <EventList onSelectedEvent={(event) => { handleSelectedEvent(event) }} />
              < UserList />
            </>)}
        </>
      )}
    </>
  )
}

export default App;
