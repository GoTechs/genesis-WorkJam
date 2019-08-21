import * as actionType from "./actionType";

export const setRedirectPath = path => {
  return {
    type: actionType.REDIRECT,
    path: path
  };
};
