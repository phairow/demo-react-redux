import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import Pubnub from 'pubnub';
import {
    createNetworkStatusActionListener,
    createPubNubActionListener,
    createPresenceActionListener,
    combineListeners
} from 'pubnub-redux';
import { PubNubProvider } from 'pubnub-react';

let pubnub = new Pubnub({
  publishKey: 'demo',
  subscribeKey: 'demo'
});

let store = configureStore();

pubnub.addListener(createPubNubActionListener(store.dispatch));

// pubnub.addListener(createNetworkStatusActionListener(store.dispatch));

// pubnub.addListener(
//     combineListeners(
//         createPresenceActionListener(store.dispatch),
//         createNetworkStatusActionListener(store.dispatch)
//     )
// )

pubnub.subscribe({
  channels: ['rai-redux']
})

setTimeout(() => {
  pubnub.publish(
      {
          message: "hi there",
          channel: 'rai-redux',
      }, 
      function (status: any, response: any) {
          if (status.error) {
              // handle error
              console.log(status)
          } else {
              console.log("message Published w/ timetoken", response.timetoken)
          }
      }
  );
}, 2000);

ReactDOM.render(
  <Provider store={store}>
    <PubNubProvider client={pubnub}>
      <App />
    </PubNubProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
