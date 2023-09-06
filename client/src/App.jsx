import { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import EventCreation from './components/EventCreation'
import EventList from './components/EventList';

function App() {
  return (
    <>
      {/*< EventCreation />*/}
      <EventList />
      < UserList />
    </>
  )
}

export default App;
