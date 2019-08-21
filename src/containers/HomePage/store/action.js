import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import Auth from "../../../Services/auth";
import helpers from "../../../Services/helpers";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";
import Config from "../../../Config/GlobalConfig.json";
import { omit, pick } from "lodash";

export const getAllUsersSucess = (usersInfo, mainUserInfo) => {
  return {
    type: actionType.GET_ALL_USERS_SUCCESS,
    usersInfo: usersInfo,
    mainUserInfo: mainUserInfo
  };
};
export const getAllUsersFailed = () => {
  return {
    type: actionType.GET_ALL_
  };
};

export const getAllUsersStart = () => {
  return dispatch => {
    dispatch(actions.showLoading());
    const mainUserId = Auth.getUserId();
    Api.apiCall({ id_main_user: mainUserId }, "getAllMainUserInfo").then(
      async response => {
        let success = response["success"];
        if (success) {
          let mainUserInfo = response.data[mainUserId];
          let usersInfo = omit(response, "success").data;

          dispatch(getAllUsersSucess(usersInfo, mainUserInfo));
        }
        dispatch(actions.hideLoading());
      }
    );
  };
};

export const getWristbandBalanceSuccess = wristbandBalanceInfo => {
  return {
    type: actionType.GET_WRISTBAND_BALANCE_SUCCESS,
    wristbandBalanceInfo: wristbandBalanceInfo
  };
};
export const getWristbandBalanceFailed = () => {
  return {
    type: actionType.GET_WRISTBAND_BALANCE_FAILED
  };
};
export const getWristbandBalanceStart = () => {
  return dispatch => {
    dispatch(actions.showLoading());
    const userId = Auth.getUserId();
    Api.apiCall({ user_id: userId }, "getBalances").then(response => {
      let success = response["success"];
      if (success) {
        const wristbandBalanceInfo = pick(
          response,
          "current_balance",
          "deposits_bonus",
          "invoices",
          "deposits",
          "spent"
        );
        dispatch(actions.hideLoading());
        dispatch(getWristbandBalanceSuccess(wristbandBalanceInfo));
      }
    });
  };
};
