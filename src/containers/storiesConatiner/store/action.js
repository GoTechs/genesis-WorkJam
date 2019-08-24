import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";
import helpers from "../../../Services/helpers";

const stories = [];
const comments = [];

export const getMaxItemSuccess = response => {
  return {
    type: actionType.GET_MAX_ITEM_SUCCESS,
    payload: response
  };
};
export const getMaxItemFailed = () => {
  return {
    type: actionType.GET_MAX_ITEM_FAILED
  };
};
export const getMaxItemStart = () => {
  return async dispatch => {
    await dispatch(actions.showLoading());
    const maxitem = await Api.apiCall("maxitem");
    await dispatch(getMaxItemSuccess(maxitem));
    if (maxitem > 10) {
      await dispatch(getTopStoriesStart());
    }
    await dispatch(actions.hideLoading());
  };
};
export const getTenTopStoriesSuccess = data => {
  return {
    type: actionType.GET_TOP_STORIES_SUCCESS,
    payload: data
  };
};
export const getTopStoriesFailed = () => {
  return {
    type: actionType.GET_TOP_STORIES_FAILED
  };
};
export const getTopStoriesStart = () => {
  return async dispatch => {
    let topTenStrories = [];
    const response = await Api.apiCall("topstories");
    topTenStrories = await response.slice(0, 10);
    await dispatch(getTenTopStoriesSuccess(topTenStrories));
    const storiesResult = await topTenStrories.map(key => {
      dispatch(getStoryStart(key));
    });
  };
};
export const getStorySuccess = data => {
  return {
    type: actionType.GET_STORY_SUCCESS,
    payload: data
  };
};
export const getStroryFailed = () => {
  return {
    type: actionType.GET_STORY_FAILED
  };
};
export const cleanComments = () => {
  return {
    type: actionType.CLEAN_COMMENTS
  };
};

export const getStoryStart = story => {
  return async dispatch => {
    const response = await Api.apiCall(`item/${story}`);
    await stories.push(response);
    dispatch(actions.hideLoading());
  };
};
export const getCommentsSuccess = data => {
  return {
    type: actionType.GET_COMMENT_SUCCESS,
    payload: data
  };
};
export const getCommentsFailed = () => {
  return {
    type: actionType.GET_COMMENT_FAILED
  };
};

export const getCommentsClicked = idComments => {
  return async dispatch => {
    await dispatch(actions.showLoading());
    await dispatch(cleanComments());
    const topTwentyComment = idComments.slice(0, 19);
    const topTwentyCommentResult = await topTwentyComment.map(async key => {
      const response = await Api.apiCall(`item/${key}`);
      await comments.push(response);
      await dispatch(getCommentsSuccess(comments));
    });
    await dispatch(actions.hideLoading());
  };
};
