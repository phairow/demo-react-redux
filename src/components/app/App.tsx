import React, { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import './App.css';
import {
  fetchSpaces,
  fetchUsers,
  createUser,
  fetchUserById,
  User,
} from 'pubnub-redux';
import { usePubNub } from 'pubnub-react';
import Left from '../left/Left';
import Right from '../right/Right';

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const user = useSelector((state: any) => state.users.byId[userName]);

  let updateUserName = (e:  React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  }
  
  let keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setUserName(e.currentTarget.value);
      loginout();
    }
  }

  let loginout = () => {
    console.log('user,,', user)
    if (!userName) {
      return;
    }

    if (!authenticated || user === undefined) {
      dispatch(fetchUserById(pubnub, userName));
      setAuthenticated(true);
    } else {
      setAuthenticated(false  );
      setUserName('');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div >
          <img className="App-header-icon" src="logo192.png"  />
          <img className="App-header-icon" src="redux-icon.svg"  />
          <span className="App-title">PubNub Demo Chat <span>(Not Ready For Production - Demo Only)</span></span>
        </div>
        <div className="App-menu">
          <label className="App-header-label">User ID:</label>
          <input
            className={!authenticated || user === undefined ? undefined: 'hide'}
            value={userName}
            onChange={updateUserName}
            onKeyDown={keyPress}
          ></input>
          <div
            className={`App-header-label ${!authenticated || user === undefined ? 'hide': undefined}`}
          >
            {userName}
          </div>
          <button className="App-load-button" onClick={loginout}>
            { authenticated && user !== undefined ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>
      <main className={!authenticated || user === undefined ? 'hide': undefined}>
        <Left user={user} />
        <Right />
      </main>
    </div>
  );
};

export default App;
