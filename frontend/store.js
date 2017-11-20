import { createStore, compose } from 'redux';
import rootReducer from './reducers.js';
// import { persistStore, persistCombineReducers } from 'redux-persist'

import { autoRehydrate, persistStore } from 'redux-persist'
// import storage from 'redux-persist/es/storage' // default: localStorage if web

import DevTools from './containers/DevTools';

let store = compose(
  DevTools.instrument(),
  autoRehydrate()
)(createStore)(rootReducer)

persistStore(store);

export default store;
