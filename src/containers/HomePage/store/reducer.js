import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";

const intialeState = {
  usersInfo: null,
  mainUserInfo: null,
  wristbandBalanceInfo: {
    current_balance: 0,
    deposits_bonus: 0,
    invoices: 0,
    deposits: 0,
    spent: 0
  }
};

const homePageReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.GET_ALL_USERS_SUCCESS:
      return updateObject(state, {
        usersInfo: action.usersInfo,
        mainUserInfo: action.mainUserInfo
      });
    case actionsType.GET_ALL_USERS_FAILED:
      return updateObject(state);
    case actionsType.GET_WRISTBAND_BALANCE_SUCCESS:
      return updateObject(state, {
        wristbandBalanceInfo: action.wristbandBalanceInfo
      });
    case actionsType.GET_WRISTBAND_BALANCE_FAILED:
      return updateObject(state);

    default:
      return state;
  }
};

export default homePageReducer;
