import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Right from './Right';
import configureStore from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore({});
  ReactDOM.render(
    <Provider store={store}>
      <Right user={{ id: 'testuser', name: 'Test User' }} space={{ id: '', name: '' }} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
