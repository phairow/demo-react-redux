import React, { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import './App.css';
import {
  fetchUserById,
  fetchMemberships,
} from 'pubnub-redux';
import { usePubNub } from 'pubnub-react';
import Left from '../left/Left';
import Right from '../right/Right';
import { membershipSelector } from '../../selectors/membershipSelector';
const App: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const user = useSelector((state: any) => state.users.byId[userId]);

  let updateUserId = (e:  React.FormEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  }
  
  let keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setUserId(e.currentTarget.value);
      loginout();
    }
  }

  let loginout = () => {
    console.log('user,,', user)
    if (!userId) {
      return;
    }

    if (!authenticated || user === undefined) {
      // load the user object
      dispatch(fetchUserById(pubnub, userId));
      // load the space memberships
      dispatch(fetchMemberships(pubnub, userId, {
        include: {
          spaceFields: true
        }
      }));
      setAuthenticated(true);
    } else {
      setAuthenticated(false  );
      setUserId('');
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
            value={userId}
            onChange={updateUserId}
            onKeyDown={keyPress}
          ></input>
          <div
            className={`App-header-label ${!authenticated || user === undefined ? 'hide': undefined}`}
          >
            {userId}
          </div>
          <button className="App-load-button" onClick={loginout}>
            { authenticated && user !== undefined ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>
      <main>
        {(authenticated && user !== undefined) ? (
          <Left user={user} />
        ) : (
          <div>
            Login
          </div>
        )}
        <Right />
      </main>
    </div>
  );
};

export default App;
