import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";

const intialeState = {
  isWristbandDisabled: false
};

const ticketContainer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.DISABLE_WRISTBAND_SUCCESS:
      return updateObject(state, {
        isWristbandDisabled: true
      });
    case actionsType.DISABLE_WRISTBAND_FAILED:
      return updateObject(state, { isWristbandDisabled: false });

    default:
      return state;
  }
};

export default ticketContainer;
