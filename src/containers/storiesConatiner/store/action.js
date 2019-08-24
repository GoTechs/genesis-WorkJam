import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";

const stories = [];

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
    await dispatch(getTenTopStoriesSuccess({ topTenStrories: topTenStrories }));
    await topTenStrories.map(async key => {
      await dispatch(getStoryStart(key));
    });

    await dispatch(actions.hideLoading());
  };
};
export const getStorySuccess = (story, stories) => {
  return {
    type: actionType.GET_STORY_SUCCESS,
    payload: { story: story, stories: stories }
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
    await dispatch(getStorySuccess(response, stories));
  };
};
export const getCommentSuccess = (comment, comments) => {
  return {
    type: actionType.GET_COMMENT_SUCCESS,
    payload: { comment: comment, comments: comments }
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
    const topTwentyComment = idComments.slice(0, 19);
    await dispatch(getCommentStart(topTwentyComment));
    await dispatch(actions.hideLoading());
  };
};

export const getCommentStart = topTwentyComment => {
  console.log(topTwentyComment);
  const comments = [];
  return async dispatch => {
    await topTwentyComment.map(async key => {
      const response = Api.apiCall(`item/${key}`);
      comments.push(response);
      await dispatch(getCommentSuccess(response, comments));
    });
  };
};
