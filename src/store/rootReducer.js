import { combineReducers } from "redux";
import loading from "./reducers/loadingReducer";
import login from "./reducers/loginReducer";
import { reducer as toastr } from "react-redux-toastr";

const createReducer = asyncReducers => {
  return combineReducers({
    login,
    loading,
    toastr,
    ...asyncReducers
  });
};

export default createReducer;
