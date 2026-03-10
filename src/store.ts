import { compose, createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { loadAuthState } from './auth/session';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore(pubnub: any) {
  const persistedAuthState = loadAuthState();
  const preloadedState = persistedAuthState ? {
    auth: persistedAuthState,
  } : undefined;

  let middleware: Middleware[] = [
    thunk.withExtraArgument({
      pubnub: {
        api: pubnub
      }
    }),
  ];

  let enhancers: StoreEnhancer[] = [
    applyMiddleware(...middleware),
  ];

  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    rootReducer,
    preloadedState,
    compose(...enhancers)
  );
}
 
