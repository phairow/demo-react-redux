import React from 'react';
import ReactDOM from 'react-dom';
import ChannelJoin from './ChannelJoin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let user = { id: 'testuser', name: 'testuser' };
  ReactDOM.render(<ChannelJoin hide={() => {}} user={user} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
