import { useEffect, useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import LoginPage from './components/LoginPage';
import EventCreation from './components/EventCreation';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import { Navbar, NavItem } from './components/Navbar';
import Profile from './components/Profile';
import DropdownItem from './components/Dropdown';
import Demo from './components/Demo';
import logo from './assets/logo.svg';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(false);
  const [getViewProfile, setGetViewProfile] = useState(null);
  const [isUserSetting, setIsUserSetting] = useState(false);
  const [isDemoing, setIsDemoing] = useState(false);

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
    handleTurnOffAllPage();
    setIsAddingNewEvent(true);
  }

  function handleTurnOffAllPage() {
    setIsAddingNewEvent(false);
    setSelectedEvent(false);
    setSelectedProfile(false);
    setIsUserSetting(false);
  }

  function handleUserSelection(username) {
    handleTurnOffAllPage();
    setSelectedProfile(true);
    setGetViewProfile(username);
  }

  function handleSetting() {
    handleTurnOffAllPage();
    setSelectedProfile(true);
    setIsUserSetting(true);
  }

  function handleDemo() {
    setIsDemoing(!isDemoing);
  }

  return <>
    {/*Navigation*/}
    {isLogin ?
      <>
        <Navbar >
          <img className='logo' src={logo} />
          <div onClick={handleDemo}><NavItem title="Demo" /></div>
          <NavItem title="Events">
            <div className='dropdown'>
              <DropdownItem onClick={handleTurnOffAllPage}>Events</DropdownItem>
              <DropdownItem onClick={handleAddNewEvent}>Add New Event</DropdownItem>
            </div>
          </NavItem>
          <NavItem title="Profile">
            <div className='dropdown'>
              <DropdownItem onClick={handleUserSelection} >My Profile</DropdownItem>
              <DropdownItem onClick={handleSetting}>Settings</DropdownItem>
              <DropdownItem onClick={handleLogin}>Log out</DropdownItem>
            </div>
          </NavItem>
        </Navbar >

        {/*Page*/}
        {isDemoing ? (
          <Demo exit={() => {handleDemo()}}/>
        ) : <>
          {isAddingNewEvent ?
            <EventCreation handelEventAddingDone={() => setIsAddingNewEvent(false)} />
            :
            <>
              {selectedProfile ? <Profile isSetting={isUserSetting} username={getViewProfile} />
                :
                selectedEvent ?
                  <EventPage event={selectedEvent} />
                  :
                  <>
                    <EventList onSelectedEvent={(event) => { handleSelectedEvent(event) }} />
                    < UserList handler={handleUserSelection} />
                  </>
              }
  
            </>
          }
        </>}
        
      </>:
      <LoginPage handler={handleLogin} />
    }
    
  </>
}

export default App;
