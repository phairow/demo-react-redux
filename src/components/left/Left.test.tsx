import React from 'react';
import ReactDOM from 'react-dom';
import Left from './Left';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let user = { name: 'testuser' };
  ReactDOM.render(<Left user={user}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
