import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import '../scss/App.scss';
import DefaultLayout from '../default-layout/';
import { Login } from '../views/Login'
import { SecurityCode } from '../views/SecurityCode'
import { ResetPassword } from '../views/ResetPassword'
import PrivateRoute from './privateRoute'
import Hierarchy from '../views/Members/Userlist/Hierarchy'


export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" name="Login Page" component={Login} />
            <Route path="/security-code" name="Security Code Page" component={SecurityCode} />
            <Route path="/password-reset" name="Reset Password" component={ResetPassword} />
            <Route path="/hierarchy/:userId" render={props => <Hierarchy {...props} />} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
    </BrowserRouter>
)
