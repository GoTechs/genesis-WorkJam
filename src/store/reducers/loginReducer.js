import * as actionsType from "../actions/actionType";
import { updateObject } from "../utilityStore";

const intialeState = {
  isLoggedIn: false,
  isEmailValidate: false,
  error: false
};

const loginPageReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.START_LOGIN:
      return updateObject(state);

    case actionsType.LOGIN_SUCCESS:
      return updateObject(state, {
        isLoggedIn: true,
        isEmailValidate: true,
        error: false
      });

    case actionsType.LOGIN_FAILED:
      return updateObject(state, {
        isLoggedIn: false,
        error: true
      });

    case actionsType.LOGIN_FAILED_VALIDATION_EMAIL:
      return updateObject(state, {
        isLoggedIn: false,
        isEmailValidate: false,
        error: true
      });

    default:
      return state;
  }
};

export default loginPageReducer;
