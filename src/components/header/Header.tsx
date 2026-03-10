import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onLogout,
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
        <div className="App-user-summary">
          <span className="App-header-label">{title}</span>
          <span className="App-header-subtitle">{subtitle}</span>
        </div>
        <button className="App-load-button" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
