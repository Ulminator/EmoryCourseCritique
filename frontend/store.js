import { createStore, compose } from 'redux';
import rootReducer from './reducers.js';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web
// import rootReducer from '../reducers.js';

import DevTools from './containers/DevTools';

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, rootReducer)

export function configureStore(initialState) {
    const store= createStore(
        reducer,
        initialState,
        compose(
            DevTools.instrument()
        )
    );
    const persistor = persistStore(store);

  return { persistor, store };
}
