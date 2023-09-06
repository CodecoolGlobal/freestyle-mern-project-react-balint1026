import { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import EventCreation from './components/EventCreation';
import EventList from './components/EventList';
import EventPage from './components/EventPage';


function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
  }
  return (
    <>
      {/*< EventCreation />*/}
      <EventList />
      <EventPage onSelectedEvent={handleSelectedEvent()}/>
      < UserList />
    </>
  )
}

export default App;
