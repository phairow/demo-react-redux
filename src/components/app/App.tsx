import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { authSelector } from '../../selectors/authSelector';
import ChatPage from '../chat/ChatPage';
import Login from '../login/Login';

const App: React.FC = () => {
  const auth = useSelector(authSelector);
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/chat');

  useEffect(() => {
    const updateRoute = () => {
      setRoute(window.location.hash.replace('#', '') || '/chat');
    };

    window.addEventListener('hashchange', updateRoute);
    updateRoute();

    return () => {
      window.removeEventListener('hashchange', updateRoute);
    };
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && route === '/login') {
      window.location.hash = '/chat';
    }

    if (!auth.isAuthenticated && route !== '/login') {
      window.location.hash = '/login';
    }
  }, [auth.isAuthenticated, route]);

  const goToChat = () => {
    window.location.hash = '/chat';
  };

  return (
    route === '/login' ? <Login onSuccess={goToChat} /> : <ChatPage />
  );
};

export default App;
