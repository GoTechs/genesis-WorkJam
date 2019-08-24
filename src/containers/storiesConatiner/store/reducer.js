import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";

const intialeState = {
  maxItem: null,
  topTenStories: [],
  loading: false,
  stories: [],
  comments: []
};

const storiesConatiner = (state = intialeState, action) => {
  switch (action.type) {
    case actionsType.GET_ALL_STORIES_SUCCESS:
      return updateObject(state, {
        isWristbandDisabled: true
      });
    case actionsType.GET_ALL_STORIES_FAILED:
      return updateObject(state, { isWristbandDisabled: false });
    case actionsType.GET_MAX_ITEM_SUCCESS:
      return updateObject(state, { maxItem: action.payload });
    case actionsType.GET_MAX_ITEM_FAILED:
      return updateObject(state);
    case actionsType.GET_TOP_STORIES_SUCCESS:
      return updateObject(state, {
        topTenStories: action.payload
      });
    case actionsType.GET_TOP_STORIES_FAILED:
      return updateObject(state);
    case actionsType.GET_STORY_SUCCESS:
      return updateObject(state, { stories: action.payload });
    case actionsType.GET_STORY_FAILED:
      return updateObject(state);
    case actionsType.GET_COMMENT_SUCCESS:
      return updateObject(state, { comments: action.payload });
    case actionsType.GET_COMMENT_FAILED:
      return updateObject(state);
    case actionsType.CLEAN_COMMENTS:
      return updateObject(state, { comments: null });

    default:
      return state;
  }
};

export default storiesConatiner;
