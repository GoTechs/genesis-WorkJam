/**
 *
 * PrivateRoute
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../Services/auth";
import Templates from "../../Services/Templates";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const Template = Templates()[Component];
  return (
    <Route
      {...rest}
      render={props =>
        auth.getUserAuth() || auth.getCanUserRegister() ? (
          <Template {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
