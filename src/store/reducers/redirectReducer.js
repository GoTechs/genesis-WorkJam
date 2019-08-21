import * as actionsType from "../actions/actionType";

const intialeState = {
  redirectPath: "/"
};

const redirectReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.SET_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path
      };

    default:
      return state;
  }
};

export default redirectReducer;
