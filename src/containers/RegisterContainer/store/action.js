import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import Auth from "../../../Services/auth";
import helpers from "../../../Services/helpers";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";
import Config from "../../../Config/GlobalConfig.json";

export const createProfileSuccess = () => {
  return {
    type: actionType.CREATE_PROFILE_SUCCESS
  };
};
export const createProfileFailed = () => {
  return {
    type: actionType.CREATE_PROFILE_FAILED
  };
};
export const shouldValidateEmail = () => {
  return {
    type: actionType.SHOULD_VALIDATE_EMAIL
  };
};

export const createProfileClicked = postDataRegister => {
  const { validateEmail } = Config.components.register;
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall(postDataRegister, "setUserInfo")
      .then(response => {
        const success = response["success"];
        const error = response["error"];
        Auth.setUSerAuth(success);
        if (success) {
          Auth.setUserId(response["user_id"]);
          dispatch(actions.hideLoading());
          if (validateEmail) {
            dispatch(shouldValidateEmail());
            dispatch(
              toastrActions.add(
                helpers.showPopUp({
                  id: "register-show",
                  type: "warning",
                  title: "Registration",
                  key: "register:REGISTER_VALIDATE_EMAIL_WARNING",
                  options: {}
                })
              )
            );
          } else {
            dispatch(createProfileSuccess());
            dispatch(
              toastrActions.add(
                helpers.showPopUp({
                  id: "register-show",
                  type: "success",
                  title: "Registration",
                  key: "register:REGISTER_SUCCESS",
                  options: {}
                })
              )
            );
          }
        } else {
          if (error.includes("Email")) {
            dispatch(createProfileFailed());
            dispatch(
              toastrActions.add(
                helpers.showPopUp({
                  id: "register-show",
                  type: "warning",
                  title: "Registration",
                  key: "register:REGISTER_EMAIL_EXIST",
                  options: {}
                })
              )
            );
          } else {
            dispatch(createProfileFailed());
            dispatch(
              toastrActions.add(
                helpers.showPopUp({
                  id: "register-show",
                  type: "warning",
                  title: "Registration",
                  key: "register:REGISTER_FAILED",
                  options: {}
                })
              )
            );
          }

          dispatch(actions.hideLoading());
        }
      })
      .catch(error => {
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "error",
              title: "Registration",
              key: error,
              options: {}
            })
          )
        );
        dispatch(actions.hideLoading());
      });
  };
};

export const updateProfileSuccess = () => {
  return {
    type: actionType.UPDATE_PROFILE_SUCCESS
  };
};
export const updateProfileFailed = () => {
  return {
    type: actionType.UPDATE_PROFILE_FAILED
  };
};

export const updateProfileClicked = updateData => {
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall(updateData, "updateUserInfo")
      .then(response => {
        let success = response["status"];
        if (success === "success") {
          dispatch(actions.hideLoading());
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "success",
                title: "Registration",
                key: "register:REGISTER_UPDATE_USER_INFO_SUCCESS",
                options: {}
              })
            )
          );
        } else {
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "warning",
                title: "Registration",
                key: "register:register:REGISTER_UPDATE_USER_INFO_FAILED",
                options: {}
              })
            )
          );
          dispatch(actions.hideLoading());
        }
      })
      .catch(error => {
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "error",
              title: "Registration",
              key: error,
              options: {}
            })
          )
        );
        dispatch(actions.hideLoading());
      });
  };
};

export const createOrderSuccess = () => {
  return {
    type: actionType.CREATE_ORDER_SUCCESS
  };
};
export const createOrderFailed = () => {
  return {
    type: actionType.CREATE_ORDER_FAILED
  };
};

export const createOrderClicked = createOrderData => {
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall(createOrderData, "updateOrCreateOrder")
      .then(response => {
        Auth.setUserExistense(response);
        if (response && response["success"] === true) {
          dispatch(actions.hideLoading());
          dispatch(createOrderSuccess());
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "success",
                title: "Registration",
                key: "register:REGISTER_ORDER_UPDATED",
                options: {}
              })
            )
          );
        } else {
          dispatch(createOrderFailed());
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "warning",
                title: "Registration",
                key: "register:REGISTER_UPDATE_ORDER_FAILD",
                options: {}
              })
            )
          );
        }
        dispatch(actions.hideLoading());
      })
      .catch(error => {
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "error",
              title: "Registration",
              key: error,
              options: {}
            })
          )
        );
        dispatch(actions.hideLoading());
      });
  };
};

export const updateOrderSuccess = () => {
  return {
    type: actionType.UPDATE_ORDER_SUCCESS
  };
};
export const updateOrderFailed = () => {
  return {
    type: actionType.UPDATE_ORDER_FAILED
  };
};
export const updateOrderClicked = updateOrderData => {
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall(updateOrderData, "getUpdateOrderData")
      .then(response => {
        Auth.setUserExistense(response);
        if (response && response["success"] === true) {
          dispatch(actions.hideLoading());
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "success",
                title: "Registration",
                key: "register:REGISTER_ORDER_UPDATED",
                options: {}
              })
            )
          );
        } else {
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "warning",
                title: "Registration",
                key: "register:REGISTER_UPDATE_ORDER_FAILD",
                options: {}
              })
            )
          );
        }
        dispatch(actions.hideLoading());
      })
      .catch(error => {
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "error",
              title: "Registration",
              key: error,
              options: {}
            })
          )
        );
        dispatch(actions.hideLoading());
      });
  };
};
