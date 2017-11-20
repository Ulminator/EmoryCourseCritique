import React from 'react';
import { render } from 'react-dom';
// import { configureStore, history } from './store/configureStore';
// import { configureStore, history } from './store.js';
import store from './store.js'
import Root from './containers/Root';

import './assets/stylesheets/base.scss';
import './assets/stylesheets/register.scss';


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
