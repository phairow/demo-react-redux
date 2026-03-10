import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Left from './Left';
import configureStore from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore({});
  let user = { id: 'testuser', name: 'testuser' };
  let space = { id: 'testspace', name: 'testspace' };
  ReactDOM.render(
    <Provider store={store}>
      <Left user={user} space={space} createChannel={() => {}} joinChannel={() => {}} selectChannel={() => {}} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
