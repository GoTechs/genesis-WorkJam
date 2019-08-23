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
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall("maxitem")
      .then(response => {
        if (response) {
          dispatch(getMaxItemSuccess(response));
        } else {
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "warning",
                type: "warning",
                title: "stories",
                key: "",
                options: {}
              })
            )
          );
        }
      })
      .then(() => {
        dispatch(getTopStoriesStart());
      });
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
  return dispatch => {
    let topTenStrories = [];
    Api.apiCall("topstories")
      .then(response => {
        topTenStrories = response.slice(0, 10);
        dispatch(getTenTopStoriesSuccess(topTenStrories));
      })
      .then(() => {
        topTenStrories.map(key => {
          dispatch(getStoryStart(key));
        });
      });
    dispatch(actions.hideLoading());
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
    await dispatch(cleanComments());
    Api.apiCall(`item/${story}`).then(response => {
      stories.push(response);
      dispatch(getStorySuccess(stories));
    });
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
  return dispatch => {
    dispatch(actions.showLoading());
    if (idComments) {
      const topTwentyComment = idComments.slice(0, 19);
      topTwentyComment.map(key => {
        Api.apiCall(`item/${key}`).then(response => {
          comments.push(response);
          if (comments) {
            dispatch(getCommentsSuccess(comments));
          }
        });
      });
    }

    dispatch(actions.hideLoading());
  };
};
