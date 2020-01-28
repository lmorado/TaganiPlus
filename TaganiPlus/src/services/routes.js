import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import '../scss/App.scss';
import DefaultLayout from '../default-layout/';
import PrivateRoute from './privateRoute'


export default () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
    </BrowserRouter>
)
