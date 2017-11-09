import React from 'react';
import { render } from 'react-dom';
// import { configureStore, history } from './store/configureStore';
import { configureStore, history } from './store.js';
import Root from './containers/Root';
import { PersistGate } from 'redux-persist/es/integration/react'

//
import './assets/stylesheets/base.scss';
import './assets/stylesheets/register.scss';
//
// // const store = configureStore({loginStatus: false});  //Added loginStatus
const { persistor, store } = configureStore();

render(
	<PersistGate persistor={persistor}>
    <Root store={store} history={history} />
    </PersistGate>,
    document.getElementById('root')

);
