import * as actionsType from "../actions/actionType";

export const hideLoading = () => {
  return {
    type: actionsType.HIDE_LOADING
  };
};
export const showLoading = () => {
  return {
    type: actionsType.SHOW_LOADING
  };
};
