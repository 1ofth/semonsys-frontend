import {Redirect, Route} from "react-router";
import React from "react";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      sessionStorage.getItem('isAuthorised') === 'true'
        ? (<Component {...props} />)
        : (<Redirect to='/' />)
    )} />
);