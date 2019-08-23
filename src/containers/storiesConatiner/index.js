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
    expanded: false
  };
  componentWillMount() {
    this.props.getMaxItemStart();
  }

  handleExpandClick = async idComments => {
    await this.props.getCommentsClicked(idComments);
    await this.setState(state => {
      state.expanded = !state.expanded;
      return state;
    });
  };

  render() {
    const { stories, comments } = this.props;
    return (
      <div className="ticket-container">
        {stories &&
          stories.map((story, key) => {
            return (
              <Story
                key={key}
                story={story}
                comments={comments}
                expanded={this.state.expanded}
                handleExpandClick={this.handleExpandClick}
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
    stories: state.storyReducer.stories,
    comments: state.storyReducer.comments
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
