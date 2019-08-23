import React, { Component } from "react";
import HeaderProfile from "../../components/HeaderProfile";
import { Trans, withNamespaces } from "react-i18next";
import Button from "../../components/Button";
import { Switch, Route } from "react-router-dom";
import AddCommentModal from "../../components/ModalContainer";
import ConfimrationModal from "../../components/ModalContainer";
import Auth from "../../Services/auth";
import Confirmation from "../../assets/images/confirmation.png";
import Story from "../../components/story";
import { connect } from "react-redux";
import withReducer from "../../store/withReducer";
import * as actions from "../../store/actions";
import reducer from "./store/reducer";
import "./styles.sass";

class StoryContainer extends Component {
  state = {
    showAddWristbandModel: false,
    showConfirmationModal: false,
    profileInfo: {},
    ticketInfo: {},
    eventKey: 1
  };
  componentWillMount() {
    this.props.getMaxItemStart();
  }

  editWristbandProfile = userId => {
    this.setState({
      showAddWristbandModel: true,
      profileInfo: this.props.usersInfo[userId]
    });
  };
  handleDisableWristband = (ticketId, UID) => {
    this.setState({
      showConfirmationModal: true,
      ticketInfo: {
        ticketId: ticketId,
        UID: UID
      }
    });
  };
  modalClose = () => {
    this.setState({
      showAddWristbandModel: false,
      showConfirmationModal: false,
      ticketInfo: {}
    });
    Auth.setVerifyWristband(false);
  };
  handleConfirmDisable = () => {
    const { ticketInfo } = this.state;
    this.props.disableWristbandClicked(ticketInfo);
    this.modalClose();
  };
  handleEventKey = key => {
    this.setState({ eventKey: key });
  };

  render() {
    const { showAddWristbandModel, showConfirmationModal } = this.state;
    console.log("hello", this.props.stories);
    return (
      <div className="ticket-container">
        <Story
          showDisable={false}
          userTicketInfo={this.state.profileInfo.infoTicket}
        />
        <button onClick={() => this.props.getCommentsClicked()}>
          get comments
        </button>
        <div className="col-md-12 buttonContainer">
          {/* <AddCommentModal
            show={showAddWristbandModel}
            onHide={this.modalClose}
            HandleOnHide={this.modalClose}
            headerTitle="Edit Profile"
          >
            <Story
              showDisable={false}
              userTicketInfo={this.state.profileInfo.infoTicket}
            />
            <InformationWristband
              HandleOnHide={this.modalClose}
              userInfo={this.state.profileInfo.infoUser}
              editProfile={true}
              onHide={this.modalClose}
              userTicketInfo={this.state.profileInfo.infoTicket}
            />
          </AddCommentModal> */}
        </div>
        <div className="col-md-12 buttonContainer">
          {/* <ConfimrationModal
            show={showConfirmationModal}
            onHide={this.modalClose}
            HandleOnHide={this.modalClose}
            headerTitle="Disable Wristband"
          >
            <div className="disable-wristband-warining">
              <img
                className="confirmation-icon"
                src={Confirmation}
                alt="confimration"
              />
              <p className="disable-description">
                <Trans i18nKey="wristband:WRISTBAND_DISABLE_WRISTBAND_WARNING">
                  Disabling your wristband from your profile is irreversible.
                  This action is recommended in the event that you lose your
                  wristband.
                </Trans>
              </p>
              <div className="modal-btns">
                <Button cancel onClick={this.modalClose}>
                  <Trans i18nKey="CANCEL_BTN">cancel </Trans>
                </Button>
                <Button confirm onClick={this.handleConfirmDisable}>
                  <Trans i18nKey="CONFIRM_BTN">confirm </Trans>
                </Button>
              </div>
            </div>
          </ConfimrationModal> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    maxItem: state.storyReducer.maxItem,
    topTenStories: state.storyReducer.topTenStories,
    stories: state.storyReducer.stories
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMaxItemStart: () => dispatch(actions.getMaxItemStart()),
    getCommentsClicked: () =>
      dispatch(actions.getCommentsClicked([20773389, 20773528]))
  };
};
export default withReducer("storyReducer", reducer)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNamespaces("story")(StoryContainer))
);
