import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";
import config from "../../../Config/GlobalConfig.json";

const intialeState = {
  theme: config.theme,
  flows: config.flows,
  routes: config.route,
  components: config.components,
  layout: config.layout
};

const appReducer = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.GET_THEME:
      return updateObject(state, {
        theme: action.theme
      });
    case actionsType.UPDATE_THEME:
      return updateObject(state, {
        theme: action.theme
      });

    default:
      return state;
  }
};

export default appReducer;
