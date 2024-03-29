import React from "react";
import { injectReducer } from "../store/initializeStore";
import { object } from "prop-types";
const withReducer = (key, reducer) => WrappedComponent => {
  const Extended = props => {
    injectReducer(key, reducer);
    return <WrappedComponent {...props} />;
  };
  Extended.contextTypes = {
    store: object
  };
  return Extended;
};
export default withReducer;
