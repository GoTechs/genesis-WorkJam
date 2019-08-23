import * as actionType from "../../../store/actions/actionType";
import Api from "../../../Services/api";
import * as actions from "../../../store/actions";
import { actions as toastrActions } from "react-redux-toastr";
import helpers from "../../../Services/helpers";

const Stories = [];
const Comments = [];

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
    Api.apiCall("maxitem").then(response => {
      if (response) {
        dispatch(getMaxItemSuccess(response));
        dispatch(getTopStoriesStart());
      } else {
        dispatch(
          toastrActions.add(
            helpers.showPopUp({
              id: "register-show",
              type: "warning",
              title: "Registration",
              key: "register:REGISTER_FAILED",
              options: {}
            })
          )
        );
      }
    });
    dispatch(actions.hideLoading());
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
    dispatch(actions.showLoading());

    Api.apiCall("topstories").then(response => {
      const topTenStrories = response.slice(0, 10);
      dispatch(getTenTopStoriesSuccess(topTenStrories));

      topTenStrories.map(key => {
        if (key) {
          dispatch(getStoryStart(key));
        }
        if (Stories) {
          dispatch(getStorySuccess(Stories));
        }
      });

      dispatch(
        toastrActions.add(
          helpers.showPopUp({
            id: "register-show",
            type: "warning",
            title: "Registration",
            key: "register:REGISTER_FAILED",
            options: {}
          })
        )
      );
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

export const getStoryStart = story => {
  return dispatch => {
    dispatch(actions.showLoading());
    Api.apiCall(`item/${story}`).then(response => {
      Stories.push(response);
      dispatch(
        toastrActions.add(
          helpers.showPopUp({
            id: "register-show",
            type: "warning",
            title: "Registration",
            key: "register:REGISTER_FAILED",
            options: {}
          })
        )
      );
    });
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
  return dispatch => {
    dispatch(actions.showLoading());
    if (idComments) {
      idComments.map(key => {
        Api.apiCall(`item/${key}`).then(response => {
          Comments.push(response);
          if (Comments) {
            dispatch(getCommentsSuccess(Comments));
          }
          dispatch(
            toastrActions.add(
              helpers.showPopUp({
                id: "register-show",
                type: "warning",
                title: "Registration",
                key: "register:REGISTER_FAILED",
                options: {}
              })
            )
          );
        });
      });
    }

    dispatch(actions.hideLoading());
  };
};
