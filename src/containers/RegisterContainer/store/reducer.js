import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";

const intialeState = {
  isProfileCreated: false,
  isValidateEmail: false,
  isOrderCreated: false
};

const registerReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.CREATE_PROFILE_SUCCESS:
      return updateObject(state, {
        isProfileCreated: true
      });
    case actionsType.CREATE_PROFILE_FAILED:
      return updateObject(state, { isProfileCreated: false });
    case actionsType.SHOULD_VALIDATE_EMAIL:
      return updateObject(state, { isValidateEmail: true });
    case actionsType.CREATE_ORDER_SUCCESS:
      return updateObject(state, { isOrderCreated: true });
    case actionsType.CREATE_ORDER_FAILED:
      return updateObject(state, { isOrderCreated: false });

    default:
      return state;
  }
};

export default registerReducer;
