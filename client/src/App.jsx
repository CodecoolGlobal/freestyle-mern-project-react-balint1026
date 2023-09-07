import { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import EventCreation from './components/EventCreation'
import LoginPage from './components/LoginPage';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  function handleLogin(prop) {
    if (isLogin) {
      localStorage.clear();
    }
    setIsLogin(!isLogin);
  }

  return (
    <>
      {isLogin ?
        <div>
          <button onClick={handleLogin}>Log out</button>
          < EventCreation />
          < UserList />
        </div> 
        :
        <LoginPage handler={handleLogin} />
      }

    </>
  )
}

export default App;
