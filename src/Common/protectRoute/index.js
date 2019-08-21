/**
 * ProtectRoute
 * Higher Order Component that blocks navigation when the user exist
 * and redirect the user to the login page if not
 **/

import React from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "../../Services/auth";

const ProtectRoute = ({ component: Component, ...rest }) => {
  let userExist = Auth.getUserExistense();

  return (
    <Route
      {...rest}
      render={props =>
        userExist && userExist["success"] === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
};

export default ProtectRoute;
