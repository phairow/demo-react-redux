import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberships, fetchUserById, Space } from 'pubnub-redux';
import { usePubNub } from 'pubnub-react';
import { logout } from '../../actions/authActions';
import { authSelector } from '../../selectors/authSelector';
import Left from '../left/Left';
import Right from '../right/Right';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ChannelCreate from '../channel-create/ChannelCreate';
import ChannelJoin from '../channel-join/ChannelJoin';

const ChatPage: React.FC = () => {
  const auth = useSelector(authSelector);
  const pubnubUserId = auth.user ? auth.user.pubnubUserId : '';
  const [showJoinChannel, setShowJoinChannel] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState<Space>({ id: '', name: '' });
  const dispatch = useDispatch<any>();
  const pubnub = usePubNub();
  const user = useSelector((state: any) => state.users.byId[pubnubUserId]);
  const hasSession = auth.isAuthenticated && auth.user !== null;

  useEffect(() => {
    if (!hasSession || pubnubUserId === '') {
      return;
    }

    dispatch(fetchUserById(pubnub, pubnubUserId));
    dispatch(fetchMemberships(pubnub, pubnubUserId, {
      include: {
        spaceFields: true,
      },
    }));

    pubnub.subscribe({
      channels: ['rai-redux', pubnubUserId],
    });
  }, [dispatch, hasSession, pubnub, pubnubUserId]);

  const closeJoinChannel = () => {
    setShowJoinChannel(false);
  };

  const closeCreateChannel = () => {
    setShowCreateChannel(false);
  };

  return (
    <div className="App">
      <Header
        title={auth.user ? auth.user.name : 'Demo User'}
        subtitle={auth.user ? auth.user.email : ''}
        onLogout={() => dispatch(logout())}
      />
      <main className="App-main">
        {user !== undefined ? (
          <React.Fragment>
            <Left
              user={user}
              space={activeChannel}
              joinChannel={() => setShowJoinChannel(true)}
              createChannel={() => setShowCreateChannel(true)}
              selectChannel={setActiveChannel}
            />
            <Right space={activeChannel} user={user} />
          </React.Fragment>
        ) : (
          <div className="App-loading-panel">Loading your channels...</div>
        )}
      </main>
      <Footer />
      {showJoinChannel && user !== undefined ? (
        <ChannelJoin hide={closeJoinChannel} user={user} />
      ) : undefined}
      {showCreateChannel ? (
        <ChannelCreate hide={closeCreateChannel} />
      ) : undefined}
    </div>
  );
};

export default ChatPage;
