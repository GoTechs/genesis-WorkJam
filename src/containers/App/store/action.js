import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import Auth from "../../../Services/auth";
import helpers from "../../../Services/helpers";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";

export const getThemeStart = () => {
  return {
    type: actionType.GET_THEME
  };
};
