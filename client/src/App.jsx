import { useEffect, useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import LoginPage from './components/LoginPage';
import EventCreation from './components/EventCreation';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import logo from './assets/logo.svg';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

useEffect(() => {
  if (localStorage.getItem("username")) {
    setIsLogin(true);
  }
},[])

  function handleLogin() {
    if (isLogin) {
      localStorage.clear();
    }
    setIsLogin(!isLogin);
  }

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
  }

  function handleAddNewEvent() {
    setIsAddingNewEvent(true);
  }

  return (
    <>
      {isAddingNewEvent ? (
        <EventCreation handleEventAddingDone={() => setIsAddingNewEvent(false)} />
      ) : (
        <>
          {selectedEvent ?
            (
              <EventPage event={selectedEvent} />
            ) : (
              <>
                {isLogin ?
                  <>
                    <button onClick={handleLogin}>Log out</button>
                    <img className='logo' src={logo} />
                    <div className='addEventBtn' onClick={handleAddNewEvent}><p>Add New Event</p></div>
                    <EventList onSelectedEvent={(event) => { handleSelectedEvent(event) }} />
                    < UserList />
                  </>
                  :
                  <LoginPage handler={handleLogin} />
                }

              </>
            )}
        </>
      )}
    </>
  )
}

export default App;
