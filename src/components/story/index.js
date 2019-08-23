import React from "react";
import Button from "../../components/Button";
import { Trans, withNamespaces } from "react-i18next";
import { map } from "lodash";
import { ListGroup } from "react-bootstrap";
import Delete from "../../assets/images/DeleteBtn.png";
import Edit from "../../assets/images/EditBtn.png";
import Wristband from "../../assets/images/bracelet-black.png";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Arrow from "../../assets/images/history.png";
import Icon from "../../components/Icons";
import "./styles.sass";

const story = props => {
  const {
    usersInfo,
    newWristbandInfo,
    userTicketInfo,
    handleDisableWristband,
    editWristbandProfile
  } = props;
  return (
    <div className="ticket-list-container">
      <ListGroup>
        <ListGroup.Item className="ticket-title">
          <h2 id="grey">
            <Trans i18nKey="wallet:WALLET_TICKET_TITLE">Ticket 1 Day </Trans>
          </h2>
          <Nav.Link
            className="header-link"
            eventKey="2"
            as={Link}
            to="/home/my-tickets/historic-ticket"
          >
            <Trans i18nKey="wallet:WALLET_HISTORIC_TICKET">
              Historic Tickets
            </Trans>
            <Icon name="ticket-historic" />
          </Nav.Link>
        </ListGroup.Item>

        <div className="ticket-info">
          <ListGroup.Item className="ticket-item">
            <div className="header-ticket">
              <h2 id="grey" className="name-user">
                gfhjkl
              </h2>
              <div className="ticket-icons">
                <img
                  className="edit-icon"
                  src={Edit}
                  alt="edit-card"
                  onClick={() => editWristbandProfile()}
                />
                <img
                  className="delete-icon"
                  src={Delete}
                  alt="disable-card"
                  onClick={() => handleDisableWristband()}
                />
              </div>
            </div>
            <img className="wristband-icon" src={Wristband} alt="wristband" />
          </ListGroup.Item>
        </div>
      </ListGroup>
      {usersInfo && (
        <Button primary onClick={props.addWristband}>
          <Trans i18nKey="ADD_TICKET_BTN">+Add Ticket </Trans>
        </Button>
      )}
      {props.newWristbandInfo && (
        <div className="new-ticket-info">
          <Icon name="wristband" className="wristband-icon-new-info" />
          <div className="new-ticket-information">
            <div className="uid-code">
              <h5>
                <Trans i18nKey="wristband:WRISTBAND_WRISTBAND_NUMBER">
                  Wristband Number
                </Trans>
              </h5>
              <h6>{newWristbandInfo.serial_number}</h6>
            </div>
            <div className="verification-code">
              <h5>
                <Trans i18nKey="wristband:WRISTBAND_VERIFICATION_CODE">
                  Verification Code
                </Trans>
              </h5>
              <h6>{newWristbandInfo.verification_code}</h6>
            </div>
          </div>
        </div>
      )}
      {userTicketInfo && (
        <div className="ticket-edit">
          <Icon name="wristband" className="wristband-icon-new-info" />
          <div className="ticket-info-edit">
            <div className="uid-code">
              <h5>
                <Trans i18nKey="wristband:WRISTBAND_WRISTBAND_NUMBER">
                  Wristband Number
                </Trans>
              </h5>
              <h6>{userTicketInfo.Number}</h6>
            </div>
            <div className="verification-code">
              <h5>
                <Trans i18nKey="wristband:WRISTBAND_VERIFICATION_CODE">
                  Verification Code
                </Trans>
              </h5>
              <h6>{userTicketInfo.UID}</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withNamespaces("story")(story);
