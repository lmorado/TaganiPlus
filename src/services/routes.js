import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import '../scss/App.scss';
import DefaultLayout from '../default-layout/';
import { Login } from '../views/Login'
import Register from '../views/Register'
import ServiceCenter from '../views/ServiceCenter'
import { SecurityCode } from '../views/SecurityCode'
import { ResetPassword } from '../views/ResetPassword'
import PrivateRoute from './privateRoute'
import Hierarchy from '../views/Members/Userlist/Hierarchy'


export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" name="Login Page" component={Login} />
            <Route path="/register" name="Register Page" component={Register} />
            <Route path="/service-center" name="Service Center" component={ServiceCenter} />
            <Route path="/security-code" name="Security Code Page" component={SecurityCode} />
            <Route path="/password-reset" name="Reset Password" component={ResetPassword} />
            <Route path="/hierarchy/:userId" render={props => <Hierarchy {...props} />} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
    </BrowserRouter>
)
