import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";

const intialeState = {
  isForgetPasswordSend: false
};

const forgetPasswordReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.FORGET_PASSWORD_SUCCESS:
      return updateObject(state, {
        isForgetPasswordSend: true
      });
    case actionsType.FORGET_PASSWORD_FAILED:
      return updateObject(state, { isForgetPasswordSend: false });
    default:
      return state;
  }
};

export default forgetPasswordReducer;
