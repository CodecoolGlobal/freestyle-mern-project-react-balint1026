import { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import EventCreation from './components/EventCreation'

function App() {
  return (
    <>
    < EventCreation />
      < UserList />
    </>
  )
}

export default App;
