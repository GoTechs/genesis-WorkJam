import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import helpers from "../../../Services/helpers";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";

export const forgetPasswordSuccess = () => {
  return {
    type: actionType.FORGET_PASSWORD_SUCCESS
  };
};
export const forgetPasswordFailed = () => {
  return {
    type: actionType.FORGET_PASSWORD_FAILED
  };
};

export const forgetPasswordClicked = formData => {
  return async dispatch => {
    dispatch(actions.showLoading());
    try {
      let response = await Api.apiCall(formData, "sendResetPassEmail");
      if (response["success"]) {
        dispatch(forgetPasswordSuccess());
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "success",
              title: "Forget Password",
              key: "RESET_PASSWORD_SUCCES",
              options: {}
            })
          )
        );
        dispatch(actions.hideLoading());
      } else {
        dispatch(forgetPasswordFailed());
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "error",
              title: "Forget Password",
              key: "FAILD_RESET_PASSWORD",
              options: {}
            })
          )
        );
      }
      dispatch(actions.hideLoading());
    } catch (error) {
      dispatch(actions.hideLoading());
      dispatch(forgetPasswordFailed());
      dispatch(
        toastrActions.add(
          helpers.showPopUp({
            id: "",
            type: "error",
            title: "Forget Password",
            key: error,
            options: {}
          })
        )
      );
    }
  };
};
