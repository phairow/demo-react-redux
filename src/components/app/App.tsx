import React, {
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import './App.css';
import {
  fetchUserById,
  fetchMemberships,
  Space,
} from 'pubnub-redux';
import { usePubNub } from 'pubnub-react';
import Left from '../left/Left';
import Right from '../right/Right';
import ChannelCreate from '../channel-create/ChannelCreate';
import ChannelJoin from '../channel-join/ChannelJoin';

const App: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [showJoinChannel, setShowJoinChannel] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState<Space>({ id: '', name: ''});
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const user = useSelector((state: any) => state.users.byId[userId]);

  let updateUserId = (e:  React.FormEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  }
  
  let loginout = () => {
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
      localStorage.setItem('userId', userId);

      pubnub.subscribe({
        channels: ['rai-redux', userId]
      })
    } else {
      setAuthenticated(false);
      localStorage.setItem('userId', '');
      setUserId('');
    }
  }

  let keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setUserId(e.currentTarget.value);
      loginout();
    }
  }

  let joinChannel = () => {
    setShowJoinChannel(true);
  }

  let closeJoinChannel = () => {
    setShowJoinChannel(false);
  }

  let createChannel = () => {
    setShowCreateChannel(true);
  }

  let selectChannel = (space: Space) => {
    setActiveChannel(space);
  }

  let closeCreateChannel = () => {
    setShowCreateChannel(false);
  }

  if (!localStorageLoaded) {
    setLocalStorageLoaded(true);
    let storedId = localStorage.getItem('userId');

    if (storedId !== null && storedId !== '') {
      setUserId(storedId);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div >
          <img className="App-header-icon" src="pubnub.svg"  />
          <img className="App-header-icon" src="logo192.png"  />
          <img className="App-header-icon" src="redux-icon.svg"  />
          <span className="App-title">Demo Chat <span>Example usage of the PubNub Redux SDK</span></span>
        </div>
        <div className="App-menu">
          <label className="App-header-label">User ID:</label>
          <input
            className={!authenticated || user === undefined ? undefined: 'hide'}
            name="userid"
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
            { authenticated && user !== undefined ? 'Log Out' : 'Log In'}
          </button>
        </div>
      </header>
      <main>
        {(authenticated && user !== undefined) ? (
          <Left
            user={user}
            space={activeChannel}
            joinChannel={joinChannel}
            createChannel={createChannel}
            selectChannel={selectChannel}
          />
        ) : (
          <div className="App-logged-out">
            Please Log In
          </div>
        )}
        {(authenticated && user !== undefined) ? (
          <Right space={activeChannel} user={user} />
        ) : (
          undefined
        )}
      </main>
      { showJoinChannel && user !== undefined ? 
        <ChannelJoin hide={closeJoinChannel} user={user} />
      : 
        undefined
      }
      { showCreateChannel ? 
        <ChannelCreate hide={closeCreateChannel} />
      : 
        undefined
      }
    </div>
  );
};

export default App;
