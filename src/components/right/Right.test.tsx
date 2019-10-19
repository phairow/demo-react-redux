import React from 'react';
import ReactDOM from 'react-dom';
import Right from './Right';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Right />, div);
  ReactDOM.unmountComponentAtNode(div);
});
