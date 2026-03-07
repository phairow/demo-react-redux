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
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ChannelCreate from '../channel-create/ChannelCreate';
import ChannelJoin from '../channel-join/ChannelJoin';

const App: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [showJoinChannel, setShowJoinChannel] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState<Space>({ id: '', name: ''});
  const dispatch = useDispatch<any>();
  const pubnub = usePubNub();
  const user = useSelector((state: any) => state.users.byId[userId]);

  let updateUserId = (e:  React.FormEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  }
  
  let loginout = () => {
    if (!userId) {
      return;
    }
console.log('user is ', userId)
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
      <Header
        userId={userId}
        authenticated={authenticated}
        hasUser={user !== undefined}
        onUserIdChange={updateUserId}
        onUserIdKeyPress={keyPress}
        onLoginToggle={loginout}
      />
      <main className="App-main">
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
      <Footer />
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
