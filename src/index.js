import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import * as PubNub from 'pubnub';
import { createStatusActionListener } from 'pubnub-redux';

let pubnub = new PubNub({
    publishKey: 'demo',
    subscribeKey: 'demo'
});

let store = configureStore();

pubnub.addListener({
    status: createStatusActionListener(store.dispatch)
});

pubnub.subscribe({
    channels: ['rai-redux']
})

setTimeout(() => {
    pubnub.publish(
        {
            message: "hi there",
            channel: 'rai-redux',
        }, 
        function (status, response) {
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
  <App />
 </Provider>,
 document.getElementById('root')
);
serviceWorker.unregister();