import * as actionType from "./actionType";
import Auth from "../../Services/auth";
import Api from "../../Services/api";
import helpers from "../../Services/helpers";
import * as actions from "../actions";
import { actions as toastrActions } from "react-redux-toastr";

export const loginSuccess = () => {
  return {
    type: actionType.LOGIN_SUCCESS
  };
};
export const loginFailed = () => {
  return {
    type: actionType.LOGIN_FAILED
  };
};
export const loginFailedValidationEmail = () => {
  return {
    type: actionType.LOGIN_FAILED
  };
};

export const loginClikced = formData => {
  return dispatch => {
    dispatch(actions.showLoading());
    Api.login(formData)
      .then(response => {
        const isloggedIn = response.data["success"];
        const isEmailValidate = response.data["emailValidate"];
        Auth.setUSerAuth(response.data["emailValidate"]);
        if (isloggedIn) {
          if (isEmailValidate) {
            Auth.setUserId(response.data["user_id"]);
            dispatch(loginSuccess());
            dispatch(actions.hideLoading());
            dispatch(
              toastrActions.add(
                helpers.showPopUp({
                  id: "login-show",
                  type: "success",
                  title: "Login",
                  key: "login:LOGIN_SUCCESS",
                  options: {}
                })
              )
            );
          } else {
            dispatch(loginFailedValidationEmail());
            dispatch(actions.hideLoading());
            dispatch(
              toastrActions.add(
                helpers.showPopUp({
                  id: "login-show",
                  type: "warning",
                  title: "Login",
                  key: "login:LOGIN_NEDD_VALIDATE_EMAIL",
                  options: {}
                })
              )
            );
          }
        } else {
          dispatch(loginFailed());
          dispatch(actions.hideLoading());
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "login-show",
                type: "error",
                title: "Login",
                key: "login:LOGIN_NOT_SUCCESS",
                options: {}
              })
            )
          );
        }
      })
      .catch(error => {
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "login-show",
              type: "error",
              title: "Login",
              key: error,
              options: {}
            })
          )
        );
      });
    dispatch(actions.hideLoading());
  };
};
