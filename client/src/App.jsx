import { useEffect, useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import LoginPage from './components/LoginPage';
import EventCreation from './components/EventCreation';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import { Navbar, NavItem } from './components/Navbar';
import DropdownItem from './components/Dropdown';
import logo from './assets/logo.svg';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setIsLogin(true);
    }
  }, [])

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

  function handleAllEvents() {
    setIsAddingNewEvent(false)
  }

  return (
    <>
        {/*Page*/}
        {
          isAddingNewEvent ?
            <EventCreation handelEventAddingDone={() => setIsAddingNewEvent(false)} />
            :
            <>
              {selectedEvent ?
                <EventPage event={selectedEvent} />
                :
                      {/*Navigation*/}
      {isLogin ? <>
        <Navbar >
          <img className='logo' src={logo} />
          <NavItem title="Events">
            <div className='dropdown'>
              <DropdownItem onClick={handleAllEvents}>Events</DropdownItem>
              <DropdownItem onClick={handleAddNewEvent}>Add New Event</DropdownItem>

            </div>
          </NavItem>
          <NavItem title="Profile">
            <div className='dropdown'>
              <DropdownItem >My Profile</DropdownItem>
              <DropdownItem onClick={handleLogin}>Log out</DropdownItem>
            </div>
          </NavItem>
        </Navbar >
              }
        <button onClick={handleLogin}>Log out</button>
                    <img className='logo' src={logo} />
                    <div className='addEventBtn' onClick={handleAddNewEvent}><p>Add New Event</p></div>
                    <EventList onSelectedEvent={(event) => { handleSelectedEvent(event) }} />
                    < UserList />
            </>
        }
      </>
        :
        <LoginPage handler={handleLogin} />}
    </>
  )
}

export default App;
