import * as actionsType from "../../../store/actions/actionType";
import { updateObject } from "../../../store/utilityStore";

const intialeState = {
  maxItem: null,
  topTenStories: [],
  loading: false,
  story: [],
  stories: [],
  comments: []
};

const storiesConatiner = (state = intialeState, action) => {
  switch (action.type) {
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
      return updateObject(state, {
        story: action.payload.story,
        stories: action.payload.stories
      });
    case actionsType.GET_STORY_FAILED:
      return updateObject(state);
    case actionsType.GET_COMMENT_SUCCESS:
      return updateObject(state, {
        comment: action.payload.comment,
        comments: action.payload.comments
      });
    case actionsType.GET_COMMENT_FAILED:
      return updateObject(state);
    case actionsType.CLEAN_COMMENTS:
      return updateObject(state, { comments: null });
    case actionsType.CLEAN_GET_STORIES_SUCCESSCOMMENTS:
      console.log(action.payload);
      return updateObject(state, { stories: action.payload });

    default:
      return state;
  }
};

export default storiesConatiner;
