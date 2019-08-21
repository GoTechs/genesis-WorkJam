import * as actionTypes from "../actions/actionType";
import { updateObject } from "../utilityStore";
const intialeState = {
  loading: false
};

const loadingReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.HIDE_LOADING:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default loadingReducer;
