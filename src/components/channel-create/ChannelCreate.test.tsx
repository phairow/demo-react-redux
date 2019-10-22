import React from 'react';
import ReactDOM from 'react-dom';
import ChannelCreate from './ChannerCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChannelCreate hide={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
