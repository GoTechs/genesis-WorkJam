import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import Auth from "../../../Services/auth";
import helpers from "../../../Services/helpers";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";
import * as actionsCreator from "../../../store/actions";

export const disableWristbandSuccess = () => {
  return {
    type: actionType.DISABLE_WRISTBAND_SUCCESS
  };
};
export const disableWristbandFailed = () => {
  return {
    type: actionType.DISABLE_WRISTBAND_FAILED
  };
};
export const disableWristbandClicked = ({ ticketId, UID }) => {
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall({ ticketid: ticketId }, "setWristbandStatus").then(response => {
      const success = response["success"] === "Yes";
      if (success) {
        dispatch(actionsCreator.getAllUsersStart());
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "",
              type: "success",
              title: "Ticket Container",
              key: "wristband:REMOVE_WRISTBAND_SUCCESS",
              options: {}
            })
          )
        );
      }
    });
    dispatch(actions.hideLoading());
  };
};
