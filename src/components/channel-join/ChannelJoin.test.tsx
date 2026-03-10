import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChannelJoin from './ChannelJoin';
import configureStore from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore({});
  let user = { id: 'testuser', name: 'testuser' };
  ReactDOM.render(
    <Provider store={store}>
      <ChannelJoin hide={() => {}} user={user} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
