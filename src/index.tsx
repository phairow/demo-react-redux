import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import Pubnub from 'pubnub';
import {
    createPubNubActionListener,
    createMembershipActionListener,
} from 'pubnub-redux';
import { PubNubProvider } from 'pubnub-react';
// @ts-ignore-start 
import { ToastProvider } from 'react-toast-notifications';
// @ts-ignore-end

let pubnub = new Pubnub({
  publishKey: 'pub-c-f9b0d980-af95-461e-ac87-012d62f92228',
  subscribeKey: 'sub-c-a3470ba0-b7a3-11e9-aec0-fa920b0289f3',
  // publishKey: 'demo-36',
  // subscribeKey: 'demo-36',
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
  channels: ['rai-redux', 'user-rai-1']
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
  <ToastProvider placement="top-center">
    <Provider store={store}>
      <PubNubProvider client={pubnub}>
        <App />
      </PubNubProvider>
    </Provider>
  </ToastProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
