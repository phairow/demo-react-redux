import React from 'react';
import './Header.css';

interface HeaderProps {
  userId: string;
  authenticated: boolean;
  userLoaded: boolean;
  onUserIdChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onLoginOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userId,
  authenticated,
  userLoaded,
  onUserIdChange,
  onKeyPress,
  onLoginOut,
}) => {
  const isLoggedIn = authenticated && userLoaded;

  return (
    <header className="App-header">
      <div>
        <img className="App-header-icon" src="pubnub.svg" alt="PubNub" />
        <img className="App-header-icon" src="logo192.png" alt="React" />
        <img className="App-header-icon" src="redux-icon.svg" alt="Redux" />
        <span className="App-title">
          Demo Chat <span>Example usage of the PubNub Redux SDK</span>
        </span>
      </div>
      <div className="App-menu">
        <label className="App-header-label">User ID:</label>
        <input
          className={!isLoggedIn ? undefined : 'hide'}
          name="userid"
          value={userId}
          onChange={onUserIdChange}
          onKeyDown={onKeyPress}
        />
        <div className={`App-header-label ${!isLoggedIn ? 'hide' : undefined}`}>
          {userId}
        </div>
        <button className="App-load-button" onClick={onLoginOut}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </header>
  );
};

export default Header;
