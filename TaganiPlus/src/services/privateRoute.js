import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// const user = JSON.parse(localStorage.getItem('user'))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            //make the component be redirected always on the SPA for the mintime
            1 !== 2
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
)

export default PrivateRoute