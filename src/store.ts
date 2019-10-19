import { compose, createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

export default function configureStore() {

  let middleware: Middleware[] = [
    thunk,
  ];

  let enhancers: StoreEnhancer[] = [
    applyMiddleware(...middleware),
  ];

  if (window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    rootReducer,
    compose(...enhancers)
  );
}
 