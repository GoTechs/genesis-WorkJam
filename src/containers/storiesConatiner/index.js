import React, { Component } from "react";
import Story from "../../components/story";
import { connect } from "react-redux";
import withReducer from "../../store/withReducer";
import * as actions from "../../store/actions";
import reducer from "./store/reducer";
import { Trans, withNamespaces } from "react-i18next";
import "./styles.sass";

class StoryContainer extends Component {
  state = {
    expanded: false,
    expandedId: ""
  };
  componentWillMount() {
    this.props.getMaxItemStart();
  }

  handleExpandClick = async (idComments, id) => {
    await this.props.getCommentsClicked(idComments);
    this.setState(state => {
      state.expanded = !state.expanded;
      state.expandedId = id;
      return state;
    });
  };

  strip = html => {
    var tmp = document.implementation.createHTMLDocument("New").body;
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  render() {
    const { stories, comments } = this.props;
    let iteration = 0;
    return (
      <div className="stories-container">
        {stories &&
          stories.map((story, key) => {
            iteration++;
            return (
              <Story
                key={key}
                expandedId={this.state.expandedId}
                story={story}
                comments={comments}
                expanded={this.state.expanded}
                handleExpandClick={this.handleExpandClick}
                strip={this.strip}
                iteration={iteration}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    maxItem: state.storyReducer.maxItem,
    topTenStories: state.storyReducer.topTenStories,
    story: state.storyReducer.story,
    stories: state.storyReducer.stories,
    comments: state.storyReducer.comments,
    comment: state.storyReducer.comment
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMaxItemStart: () => dispatch(actions.getMaxItemStart()),
    getCommentsClicked: idComments =>
      dispatch(actions.getCommentsClicked(idComments))
  };
};
export default withReducer("storyReducer", reducer)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNamespaces("story")(StoryContainer))
);
