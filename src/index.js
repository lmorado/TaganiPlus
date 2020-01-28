import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/createStore';
import 'react-app-polyfill/ie9' // For IE 9-11 support
import 'react-app-polyfill/ie11' // For IE 11 support
import './polyfills'
import { Router } from 'react-router-dom'
import Routes from './services/routes'
import history from './utils/history'


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routes />
        </Router>
    </Provider>
    , document.getElementById('root'));
