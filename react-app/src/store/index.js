import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Default exports allow us to name the reducers here
import session from './session'
<<<<<<< HEAD
import habits from "./habits"

const rootReducer = combineReducers({
  session,
  habits
=======
import daily from './daily'

const rootReducer = combineReducers({
  session,
  daily
>>>>>>> dailies
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
