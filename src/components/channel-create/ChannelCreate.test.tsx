import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChannelCreate from './ChannelCreate';
import configureStore from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore({});
  ReactDOM.render(
    <Provider store={store}>
      <ChannelCreate hide={() => {}} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
