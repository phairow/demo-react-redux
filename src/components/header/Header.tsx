import React from 'react';

interface HeaderProps {
  userId: string;
  authenticated: boolean;
  hasUser: boolean;
  onUserIdChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onUserIdKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onLoginToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userId,
  authenticated,
  hasUser,
  onUserIdChange,
  onUserIdKeyPress,
  onLoginToggle,
}) => {
  return (
    <header className="App-header">
      <div className="App-branding">
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
          className={!authenticated || !hasUser ? undefined : 'hide'}
          name="userid"
          value={userId}
          onChange={onUserIdChange}
          onKeyDown={onUserIdKeyPress}
        ></input>
        <div className={`App-header-label ${!authenticated || !hasUser ? 'hide' : undefined}`}>
          {userId}
        </div>
        <button className="App-load-button" onClick={onLoginToggle}>
          {authenticated && hasUser ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </header>
  );
};

export default Header;
